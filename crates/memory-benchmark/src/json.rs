//! Hand-rolled JSON encoder with deterministic key ordering.
//!
//! Avoids serde so we have zero external dependencies and total control over
//! the byte-output. Encoded form is canonical: keys lexicographically sorted,
//! no extra whitespace, no trailing comma, no unicode escapes for ASCII.
//!
//! Decoder is intentionally minimal (only what `prompt_reduce` and
//! `population_report` need) — bench.rs only writes, never reads.

use std::collections::BTreeMap;

/// A minimal JSON value type. BTreeMap keeps object keys sorted by Ord.
#[derive(Debug, Clone, PartialEq)]
pub enum Json {
    Null,
    Bool(bool),
    Int(i64),
    Float(f64),
    Str(String),
    Array(Vec<Json>),
    Object(BTreeMap<String, Json>),
}

impl Json {
    pub fn obj() -> BTreeMap<String, Json> {
        BTreeMap::new()
    }

    /// Encode to compact, deterministic JSON.
    pub fn to_string(&self) -> String {
        let mut buf = String::with_capacity(256);
        self.write_to(&mut buf);
        buf
    }

    pub fn write_to(&self, out: &mut String) {
        match self {
            Json::Null => out.push_str("null"),
            Json::Bool(b) => out.push_str(if *b { "true" } else { "false" }),
            Json::Int(n) => out.push_str(&n.to_string()),
            Json::Float(f) => {
                if !f.is_finite() {
                    // Canonical: non-finite floats become null. Determinism.
                    out.push_str("null");
                } else if f.fract() == 0.0 && f.abs() < 1e16 {
                    // Render as integer-shaped if exact.
                    out.push_str(&format!("{}.0", *f as i64));
                } else {
                    // Use Rust's shortest round-trip repr.
                    out.push_str(&format!("{}", f));
                }
            }
            Json::Str(s) => encode_str(s, out),
            Json::Array(items) => {
                out.push('[');
                for (i, item) in items.iter().enumerate() {
                    if i > 0 {
                        out.push(',');
                    }
                    item.write_to(out);
                }
                out.push(']');
            }
            Json::Object(map) => {
                out.push('{');
                let mut first = true;
                for (k, v) in map.iter() {
                    if !first {
                        out.push(',');
                    }
                    first = false;
                    encode_str(k, out);
                    out.push(':');
                    v.write_to(out);
                }
                out.push('}');
            }
        }
    }
}

fn encode_str(s: &str, out: &mut String) {
    out.push('"');
    for c in s.chars() {
        match c {
            '"' => out.push_str("\\\""),
            '\\' => out.push_str("\\\\"),
            '\n' => out.push_str("\\n"),
            '\r' => out.push_str("\\r"),
            '\t' => out.push_str("\\t"),
            '\u{08}' => out.push_str("\\b"),
            '\u{0c}' => out.push_str("\\f"),
            c if (c as u32) < 0x20 => {
                out.push_str(&format!("\\u{:04x}", c as u32));
            }
            c => out.push(c),
        }
    }
    out.push('"');
}

// ───────── helpers for builder ergonomics ─────────

pub fn s<T: Into<String>>(v: T) -> Json {
    Json::Str(v.into())
}
pub fn n(v: i64) -> Json {
    Json::Int(v)
}
pub fn f(v: f64) -> Json {
    Json::Float(v)
}
pub fn b(v: bool) -> Json {
    Json::Bool(v)
}
pub fn arr(v: Vec<Json>) -> Json {
    Json::Array(v)
}
pub fn arr_str<T: Into<String>>(v: impl IntoIterator<Item = T>) -> Json {
    Json::Array(v.into_iter().map(|x| Json::Str(x.into())).collect())
}
pub fn obj(pairs: &[(&str, Json)]) -> Json {
    let mut m = BTreeMap::new();
    for (k, v) in pairs {
        m.insert((*k).to_string(), v.clone());
    }
    Json::Object(m)
}

// ───────── minimal decoder (only objects/arrays/strings/ints) ─────────

/// Very small JSON parser. Used only by prompt_reduce / population_report for
/// reading the lightweight JSONL ledger lines we produce ourselves. Supports a
/// subset: bool, null, int, float, string, array, object. No exponents on int.
pub fn parse(src: &str) -> Result<Json, String> {
    let mut p = Parser { src, pos: 0 };
    p.skip_ws();
    let v = p.parse_value()?;
    p.skip_ws();
    if p.pos != src.len() {
        return Err(format!("extra input at byte {}", p.pos));
    }
    Ok(v)
}

struct Parser<'a> {
    src: &'a str,
    pos: usize,
}

impl<'a> Parser<'a> {
    fn peek(&self) -> Option<u8> {
        self.src.as_bytes().get(self.pos).copied()
    }
    fn bump(&mut self) -> Option<u8> {
        let b = self.peek()?;
        self.pos += 1;
        Some(b)
    }
    fn skip_ws(&mut self) {
        while let Some(b) = self.peek() {
            if matches!(b, b' ' | b'\t' | b'\n' | b'\r') {
                self.pos += 1;
            } else {
                break;
            }
        }
    }
    fn expect(&mut self, c: u8) -> Result<(), String> {
        if self.peek() == Some(c) {
            self.pos += 1;
            Ok(())
        } else {
            Err(format!("expected {:?} at byte {}", c as char, self.pos))
        }
    }
    fn parse_value(&mut self) -> Result<Json, String> {
        self.skip_ws();
        match self.peek() {
            Some(b'{') => self.parse_object(),
            Some(b'[') => self.parse_array(),
            Some(b'"') => self.parse_string().map(Json::Str),
            Some(b't') | Some(b'f') => self.parse_bool(),
            Some(b'n') => self.parse_null(),
            Some(b'-') | Some(b'0'..=b'9') => self.parse_number(),
            Some(c) => Err(format!("unexpected byte {:?} at {}", c as char, self.pos)),
            None => Err("unexpected EOF".to_string()),
        }
    }
    fn parse_null(&mut self) -> Result<Json, String> {
        if self.src[self.pos..].starts_with("null") {
            self.pos += 4;
            Ok(Json::Null)
        } else {
            Err(format!("invalid null at {}", self.pos))
        }
    }
    fn parse_bool(&mut self) -> Result<Json, String> {
        if self.src[self.pos..].starts_with("true") {
            self.pos += 4;
            Ok(Json::Bool(true))
        } else if self.src[self.pos..].starts_with("false") {
            self.pos += 5;
            Ok(Json::Bool(false))
        } else {
            Err(format!("invalid bool at {}", self.pos))
        }
    }
    fn parse_number(&mut self) -> Result<Json, String> {
        let start = self.pos;
        if self.peek() == Some(b'-') {
            self.pos += 1;
        }
        while let Some(b'0'..=b'9') = self.peek() {
            self.pos += 1;
        }
        let mut is_float = false;
        if self.peek() == Some(b'.') {
            is_float = true;
            self.pos += 1;
            while let Some(b'0'..=b'9') = self.peek() {
                self.pos += 1;
            }
        }
        if matches!(self.peek(), Some(b'e') | Some(b'E')) {
            is_float = true;
            self.pos += 1;
            if matches!(self.peek(), Some(b'+') | Some(b'-')) {
                self.pos += 1;
            }
            while let Some(b'0'..=b'9') = self.peek() {
                self.pos += 1;
            }
        }
        let slice = &self.src[start..self.pos];
        if is_float {
            slice
                .parse::<f64>()
                .map(Json::Float)
                .map_err(|e| format!("bad number {}: {}", slice, e))
        } else {
            slice
                .parse::<i64>()
                .map(Json::Int)
                .map_err(|e| format!("bad int {}: {}", slice, e))
        }
    }
    fn parse_string(&mut self) -> Result<String, String> {
        self.expect(b'"')?;
        let mut out = String::new();
        loop {
            match self.bump() {
                Some(b'"') => return Ok(out),
                Some(b'\\') => match self.bump() {
                    Some(b'"') => out.push('"'),
                    Some(b'\\') => out.push('\\'),
                    Some(b'/') => out.push('/'),
                    Some(b'n') => out.push('\n'),
                    Some(b'r') => out.push('\r'),
                    Some(b't') => out.push('\t'),
                    Some(b'b') => out.push('\u{08}'),
                    Some(b'f') => out.push('\u{0c}'),
                    Some(b'u') => {
                        let hex = &self.src[self.pos..self.pos + 4];
                        let cp = u32::from_str_radix(hex, 16)
                            .map_err(|e| format!("bad \\u escape: {}", e))?;
                        if let Some(c) = char::from_u32(cp) {
                            out.push(c);
                        }
                        self.pos += 4;
                    }
                    other => {
                        return Err(format!(
                            "bad escape {:?} at {}",
                            other.map(|b| b as char),
                            self.pos
                        ))
                    }
                },
                Some(c) => out.push(c as char),
                None => return Err("unterminated string".to_string()),
            }
        }
    }
    fn parse_array(&mut self) -> Result<Json, String> {
        self.expect(b'[')?;
        let mut items = Vec::new();
        self.skip_ws();
        if self.peek() == Some(b']') {
            self.pos += 1;
            return Ok(Json::Array(items));
        }
        loop {
            items.push(self.parse_value()?);
            self.skip_ws();
            match self.peek() {
                Some(b',') => {
                    self.pos += 1;
                    self.skip_ws();
                }
                Some(b']') => {
                    self.pos += 1;
                    return Ok(Json::Array(items));
                }
                Some(c) => {
                    return Err(format!(
                        "expected , or ] got {:?} at {}",
                        c as char, self.pos
                    ))
                }
                None => return Err("unterminated array".to_string()),
            }
        }
    }
    fn parse_object(&mut self) -> Result<Json, String> {
        self.expect(b'{')?;
        let mut map = BTreeMap::new();
        self.skip_ws();
        if self.peek() == Some(b'}') {
            self.pos += 1;
            return Ok(Json::Object(map));
        }
        loop {
            self.skip_ws();
            let k = self.parse_string()?;
            self.skip_ws();
            self.expect(b':')?;
            let v = self.parse_value()?;
            map.insert(k, v);
            self.skip_ws();
            match self.peek() {
                Some(b',') => {
                    self.pos += 1;
                }
                Some(b'}') => {
                    self.pos += 1;
                    return Ok(Json::Object(map));
                }
                Some(c) => {
                    return Err(format!(
                        "expected , or }} got {:?} at {}",
                        c as char, self.pos
                    ))
                }
                None => return Err("unterminated object".to_string()),
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn primitives_roundtrip() {
        assert_eq!(Json::Null.to_string(), "null");
        assert_eq!(Json::Bool(true).to_string(), "true");
        assert_eq!(Json::Int(42).to_string(), "42");
        assert_eq!(Json::Float(1.5).to_string(), "1.5");
        assert_eq!(s("hi").to_string(), "\"hi\"");
    }

    #[test]
    fn objects_have_sorted_keys() {
        let o = obj(&[("z", n(1)), ("a", n(2)), ("m", n(3))]);
        let encoded = o.to_string();
        assert_eq!(encoded, "{\"a\":2,\"m\":3,\"z\":1}");
    }

    #[test]
    fn string_escapes() {
        assert_eq!(s("a\"b").to_string(), "\"a\\\"b\"");
        assert_eq!(s("a\nb").to_string(), "\"a\\nb\"");
    }

    #[test]
    fn parse_then_encode_is_canonical() {
        let input = r#"{"z":1, "a":2}"#;
        let v = parse(input).unwrap();
        assert_eq!(v.to_string(), "{\"a\":2,\"z\":1}");
    }

    #[test]
    fn float_canonical_form_for_whole_numbers() {
        // 5.0 must encode as "5.0", not "5" — preserves float type round-trip.
        assert_eq!(Json::Float(5.0).to_string(), "5.0");
    }
}
