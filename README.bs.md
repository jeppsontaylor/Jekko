<p align="center">
  <a href="https://jekko.ai">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="Jekko logo">
    </picture>
  </a>
</p>
<p align="center">Jekko je open source AI agent za programiranje.</p>
<p align="center">
  <a href="https://jekko.ai/discord"><img alt="Discord" src="https://img.shields.io/discord/1391832426048651334?style=flat-square&label=discord" /></a>
  <a href="https://www.npmjs.com/package/jekko-ai"><img alt="npm" src="https://img.shields.io/npm/v/jekko-ai?style=flat-square" /></a>
  <a href="https://github.com/anomalyco/jekko/actions/workflows/publish.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/anomalyco/jekko/publish.yml?style=flat-square&branch=dev" /></a>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.gr.md">Ελληνικά</a> |
  <a href="README.vi.md">Tiếng Việt</a>
</p>

[![Jekko Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://jekko.ai)

---

### Instalacija

```bash
# YOLO
curl -fsSL https://jekko.ai/install | bash

# Package manageri
npm i -g jekko-ai@latest        # ili bun/pnpm/yarn
scoop install jekko             # Windows
choco install jekko             # Windows
brew install anomalyco/tap/jekko # macOS i Linux (preporučeno, uvijek ažurno)
brew install jekko              # macOS i Linux (zvanična brew formula, rjeđe se ažurira)
sudo pacman -S jekko            # Arch Linux (Stable)
paru -S jekko-bin               # Arch Linux (Latest from AUR)
mise use -g jekko               # Bilo koji OS
nix run nixpkgs#jekko           # ili github:anomalyco/jekko za najnoviji dev branch
```

> [!TIP]
> Ukloni verzije starije od 0.1.x prije instalacije.

#### Instalacijski direktorij

Instalacijska skripta koristi sljedeći redoslijed prioriteta za putanju instalacije:

1. `$JEKKO_INSTALL_DIR` - Prilagođeni instalacijski direktorij
2. `$XDG_BIN_DIR` - Putanja usklađena sa XDG Base Directory specifikacijom
3. `$HOME/bin` - Standardni korisnički bin direktorij (ako postoji ili se može kreirati)
4. `$HOME/.jekko/bin` - Podrazumijevana rezervna lokacija

```bash
# Primjeri
JEKKO_INSTALL_DIR=/usr/local/bin curl -fsSL https://jekko.ai/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://jekko.ai/install | bash
```

### Agenti

Jekko uključuje dva ugrađena agenta između kojih možeš prebacivati tasterom `Tab`.

- **build** - Podrazumijevani agent sa punim pristupom za razvoj
- **plan** - Agent samo za čitanje za analizu i istraživanje koda
  - Podrazumijevano zabranjuje izmjene datoteka
  - Traži dozvolu prije pokretanja bash komandi
  - Idealan za istraživanje nepoznatih codebase-ova ili planiranje izmjena

Uključen je i **general** pod-agent za složene pretrage i višekoračne zadatke.
Koristi se interno i može se pozvati pomoću `@general` u porukama.

Saznaj više o [agentima](https://jekko.ai/docs/agents).

### Dokumentacija

Za više informacija o konfiguraciji Jekko-a, [**pogledaj dokumentaciju**](https://jekko.ai/docs).

### Doprinosi

Ako želiš doprinositi Jekko-u, pročitaj [upute za doprinošenje](./CONTRIBUTING.md) prije slanja pull requesta.

### Gradnja na Jekko-u

Ako radiš na projektu koji je povezan s Jekko-om i koristi "jekko" kao dio naziva, npr. "jekko-dashboard" ili "jekko-mobile", dodaj napomenu u svoj README da projekat nije napravio Jekko tim i da nije povezan s nama.

### FAQ

#### Po čemu se razlikuje od Claude Code-a?

Po mogućnostima je vrlo sličan Claude Code-u. Ključne razlike su:

- 100% open source
- Nije vezan za jednog provajdera. Iako preporučujemo modele koje nudimo kroz [Jekko Zen](https://jekko.ai/zen), Jekko možeš koristiti s Claude, OpenAI, Google ili čak lokalnim modelima. Kako modeli napreduju, razlike među njima će se smanjivati, a cijene padati, zato je nezavisnost od provajdera važna.
- LSP podrška odmah po instalaciji
- Fokus na TUI. Jekko grade neovim korisnici i kreatori [terminal.shop](https://terminal.shop); pomjeraćemo granice onoga što je moguće u terminalu.
- Klijent/server arhitektura. To, recimo, omogućava da Jekko radi na tvom računaru dok ga daljinski koristiš iz mobilne aplikacije, što znači da je TUI frontend samo jedan od mogućih klijenata.

---

**Pridruži se našoj zajednici** [Discord](https://discord.gg/jekko) | [X.com](https://x.com/jekko)
