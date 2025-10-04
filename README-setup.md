# Magnite Workshop — Machine Setup (macOS)

Goal: 15-20 minutes of prep so we can spend the session building, not installing. If you can't get everything installed that is fine I can help along the way, but best to have the basics like python, node.js, and homebrew set up before hand.

NOTE: GIVE THIS TO CLAUDE CODE (CC) BY COPY/PASTING THIS LINE INTO CC;
@README-setup.md \ claude, read the setup docs and run it. The goal is to get my computer set up properly so that I can build with Mike the consultant. if we run into errors that you can NOT solve, then create a detailed ERRORS.MD with an explanation of whats happening so Mike can help debug.

## 0) TL;DR — one-time installs
- Install Homebrew and Xcode Command Line Tools (CLT only; Xcode.app not required)
- Install Node 18+ (Current or LTS) and npm; add Yarn 1.x (classic)
- Install Python 3.12+ and map `python` → Python 3 for convenience
- Install GitHub CLI and authenticate (HTTPS via gh)
- Install Cursor and enable Claude Code v2

Baseline targets (match my machine):
- Node v18+ (I’m on v24.1.0), npm 9+, Yarn 1.x
- Python 3.12+ (3.13 is fine); `python` runs Python 3
- Git + GitHub CLI (gh) working
- No Java required

You can paste commands below into Terminal (they are idempotent).

---

## Paste-once bootstrap (optional)
Paste this block into Terminal to auto-check installs, prompt for minimal setup, and print a summary.
```bash
(
  echo "=== Homebrew ==="
  if ! command -v brew >/dev/null 2>&1; then
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" || true
    eval "$(/opt/homebrew/bin/brew shellenv)" 2>/dev/null || true
  fi
  brew --version || true

  echo "=== Xcode Command Line Tools ==="
  xcode-select -p >/dev/null 2>&1 || xcode-select --install || true

  echo "=== Git & GitHub CLI ==="
  brew install git gh >/dev/null 2>&1 || true
  git --version || true
  gh --version || true
  gh auth status || gh auth login -w || true
  git config --global credential.helper osxkeychain || true
  git config --global url."https://github.com/".insteadOf ssh://git@github.com/ || true
  git config --global url."https://github.com/".insteadOf git@github.com: || true

  echo "=== Node, npm, Yarn, TypeScript ==="
  if ! command -v node >/dev/null 2>&1; then brew install node || true; fi
  node -v || true
  npm -v || true
  npm i -g yarn@1 typescript ts-node >/dev/null 2>&1 || true
  yarn -v || true
  tsc -v || echo "TypeScript CLI not installed (ok)"

  echo "=== Python ==="
  if ! command -v python3 >/dev/null 2>&1; then brew install python@3.12 || true; fi
  python3 --version || true
  pip3 --version || true
  if ! python -V 2>/dev/null | grep -q "Python 3"; then
    grep -q 'alias python=python3' ~/.zshrc || echo 'alias python=python3' >> ~/.zshrc
    grep -q 'alias pip=pip3' ~/.zshrc || echo 'alias pip=pip3' >> ~/.zshrc
  fi

  echo "=== Cursor ==="
  if open -Ra Cursor 2>/dev/null; then
    echo "Cursor installed"
  else
    echo "Cursor not found — install from https://www.cursor.dev"
  fi

  echo "=== Claude Code ==="
  echo "Enable in Cursor → Settings → Models: select Claude 3.5 Sonnet + Claude Code v2"

  echo "=== Codex CLI (optional) ==="
  if command -v codex >/dev/null 2>&1; then
    codex --version || true
  else
    echo "Codex CLI not found. Install with: npm i -g @openai/codex OR brew install codex"
  fi

  echo "=== Done ==="
) 2>/dev/null || true
```

## 1) Xcode Command Line Tools + Homebrew
```bash
# Xcode CLT (will open a GUI if not installed)
xcode-select --install || true

# Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" || true

# Add brew to PATH (Apple Silicon default)
if ! command -v brew >/dev/null; then
  echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc
  export PATH="/opt/homebrew/bin:$PATH"
fi

brew update && brew doctor || true
```

## 2) Core dev tooling
```bash
brew install git gh || true
```

## 3) Node (18+), npm, Yarn (match baseline)
```bash
# Option A (simple): Homebrew Node (Current/LTS is fine)
brew install node || true

# Option B (flexible): nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install --lts && nvm use --lts

# Verify
node -v
npm -v

# Yarn classic (v1) and optional TypeScript CLI
npm i -g yarn@1 typescript ts-node || true
tsc -v || echo "TypeScript CLI not installed (ok)"
```

## 4) Python 3.12+ (make `python` run Python 3)
```bash
brew install python@3.12 || true
python3 --version
pip3 --version

# Map `python` and `pip` to Python 3 for convenience
grep -q 'alias python=python3' ~/.zshrc || echo 'alias python=python3' >> ~/.zshrc
grep -q 'alias pip=pip3' ~/.zshrc || echo 'alias pip=pip3' >> ~/.zshrc
source ~/.zshrc || true

# Verify both commands
python --version
pip --version
```


## 5) GitHub authentication (HTTPS via gh)
```bash
# Login to GitHub via the CLI (opens browser for OAuth)
gh auth login -w

# Ensure Git uses macOS Keychain for HTTPS tokens
git config --global credential.helper osxkeychain

# Verify auth and protocol (should show https)
gh auth status

# Make https the default for GitHub remotes (optional but recommended)
git config --global url."https://github.com/".insteadOf ssh://git@github.com/
git config --global url."https://github.com/".insteadOf git@github.com:

# Create and push a repo from current folder (optional)
# gh repo create <repo-name> --private --source=. --remote=origin --push -y
```

## 6) Install Cursor
- Download and install Cursor: https://www.cursor.dev
- Open Cursor and sign in
- In Cursor menu, click “Check for Updates” to ensure latest version

## 7) Enable Claude Code in Cursor (required)
- In Cursor → Settings → Models, select Claude 3.5 Sonnet and enable Claude Code v2
- Ensure Cursor is up to date (Cursor → Check for Updates)
- Optional: If you have an Anthropic API key, add it in Settings → Models/API Keys



## 8) Optional: OpenAI Codex CLI (terminal agent)
Docs: https://developers.openai.com/codex/cli/
```bash
# Install with npm (if you already use Node)
npm install -g @openai/codex || true

# Or install with Homebrew
brew install codex || brew upgrade codex || true

# Run and authenticate (opens a browser on first run)
codex

# Verify / upgrade
codex --version
npm install -g @openai/codex@latest || brew upgrade codex || true
```

## 9) Verify everything is ready
```bash
# Expect versions (or newer/close):
node -v      # v18+ (Current or LTS ok)
npm -v
tsc -v || echo "tsc not installed (ok)"
python --version  # should print Python 3.x
python3 --version # 3.12+ is great
git --version
gh --version
```

## 10) Quick repo smoke test (optional)
```bash
mkdir -p ~/magnite-setup-test && cd ~/magnite-setup-test
printf "# Magnite Setup Test\n" > README.md
git init && git add . && git commit -m "init"
# Create a private repo and push
gh repo create magnite-setup-test --private --source=. --remote=origin --push -y
```

## 11) Troubleshooting
- If `brew` isn’t found, restart Terminal or add `/opt/homebrew/bin` to PATH in `~/.zshrc`
- If `nvm` isn’t found after install, restart Terminal or re-source your shell config: `source ~/.zshrc`
- If `python` doesn’t run Python 3, add to `~/.zshrc`: `alias python=python3; alias pip=pip3`, then `source ~/.zshrc`
- If `gh auth status` shows protocol `ssh` and you want HTTPS, run:
  `git config --global url."https://github.com/".insteadOf ssh://git@github.com/` and
  `git config --global url."https://github.com/".insteadOf git@github.com:`

---

Done! If any step takes more than ~10 minutes, stop and we’ll fix it live during the workshop.
