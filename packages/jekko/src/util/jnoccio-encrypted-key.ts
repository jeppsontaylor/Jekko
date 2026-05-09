export type JnoccioEncryptedGitCryptKeyEnvelope = {
  version: 1
  kdf: "scrypt"
  cipher: "aes-256-gcm"
  salt: string
  iv: string
  tag: string
  ciphertext: string
  params: {
    N: number
    r: number
    p: number
    maxmem: number
  }
  aad: "jnoccio-fusion-git-crypt-key-v1"
}

export const JNOCCIO_ENCRYPTED_GIT_CRYPT_KEY = {
  "version": 1,
  "kdf": "scrypt",
  "cipher": "aes-256-gcm",
  "salt": "l1Ho5Szw10Icg_OlYGzuoQ",
  "iv": "75LI-SCMo-et9nDx",
  "tag": "QUh4dSQm1xKPtg3QAmg4mg",
  "ciphertext": "0Pc-Qpps598VOpnFHq6M1p5dTwE-u3V2DCfFf1guPbPnB2DgWQVeJm78JGSvrHPvCqX1S9F7iaAgei6F7us1UWLeZ8h30yoNsZeJAEh3OOnHmSnhLdpDY3m7xgM0-zHlNQRO-lp6U5bXy14dxGgWb-AU7hT9aYVSIGXPkAbVx2Z37hQASeOg2yvvnGskfsB69qncXw",
  "params": {
    "N": 262144,
    "r": 8,
    "p": 1,
    "maxmem": 536870912
  },
  "aad": "jnoccio-fusion-git-crypt-key-v1"
} as const satisfies JnoccioEncryptedGitCryptKeyEnvelope
