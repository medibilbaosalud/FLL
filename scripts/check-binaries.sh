#!/usr/bin/env bash
set -euo pipefail

# Guard script to ensure large binary files are stored via Git LFS.

threshold=$((1024 * 1024)) # 1MB

if ! command -v git >/dev/null 2>&1; then
  echo "[check-binaries] Error: git command not found." >&2
  exit 1
fi

if ! command -v file >/dev/null 2>&1; then
  echo "[check-binaries] Error: 'file' command not found. Install it to enable MIME detection." >&2
  exit 1
fi

if ! git lfs version >/dev/null 2>&1; then
  echo "[check-binaries] Error: git-lfs is not installed. Run 'bash scripts/setup-lfs.sh' first." >&2
  exit 1
fi

# Build a lookup of files already tracked by Git LFS.
declare -A lfs_tracked=()
while IFS= read -r lfs_path; do
  [[ -z "$lfs_path" ]] && continue
  lfs_tracked["$lfs_path"]=1
done < <(git lfs ls-files -n)

problematic=()

while IFS= read -r -d '' path; do
  # Skip directories just in case, although git ls-files should only list files.
  [[ -d "$path" ]] && continue

  mime_output=$(file --mime "$path")
  if [[ "$mime_output" != *"charset=binary"* ]]; then
    continue
  fi

  if [[ -n "${lfs_tracked[$path]:-}" ]]; then
    continue
  fi

  size_bytes=$(wc -c < "$path")
  if (( size_bytes > threshold )); then
    problematic+=("$path ($((size_bytes / 1024)) KiB)")
  fi
done < <(git ls-files -z)

if [[ ${#problematic[@]} -gt 0 ]]; then
  echo "[check-binaries] Found binary files over 1MB that are not tracked via Git LFS:" >&2
  for entry in "${problematic[@]}"; do
    echo "  - $entry" >&2
  done
  echo "[check-binaries] Use Git LFS or add the files to .gitignore before committing." >&2
  exit 1
fi

echo "[check-binaries] OK: no large binary files outside Git LFS were found."
