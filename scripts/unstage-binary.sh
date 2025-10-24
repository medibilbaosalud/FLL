#!/usr/bin/env bash
set -euo pipefail

# Remove a binary file from the Git index without deleting it locally
# and add it to .gitignore to avoid future mistakes.

usage() {
  echo "Usage: bash scripts/unstage-binary.sh <path-to-file>" >&2
}

if [[ $# -ne 1 ]]; then
  usage
  exit 1
fi

target=$1

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "[unstage-binary] Error: this script must be run inside a Git repository." >&2
  exit 1
fi

if ! git ls-files --error-unmatch "$target" >/dev/null 2>&1; then
  echo "[unstage-binary] Warning: '$target' is not staged. Nothing to unstage." >&2
else
  echo "[unstage-binary] Removing '$target' from the Git index..."
  git rm --cached -- "$target"
fi

if [[ ! -f .gitignore ]]; then
  touch .gitignore
fi

if ! grep -Fxq "$target" .gitignore; then
  echo "$target" >> .gitignore
  echo "[unstage-binary] Added '$target' to .gitignore."
else
  echo "[unstage-binary] '$target' is already listed in .gitignore."
fi

echo "[unstage-binary] Remember to commit the updated .gitignore and consider tracking the file with Git LFS if appropriate."
