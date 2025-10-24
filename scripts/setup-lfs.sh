#!/usr/bin/env bash
set -euo pipefail

# Configure Git LFS for this repository and make sure the expected
# patterns are tracked in .gitattributes.

echo "[setup-lfs] Installing Git LFS hooks..."
git lfs install

if [[ ! -f .gitattributes ]]; then
  echo "[setup-lfs] Error: .gitattributes not found. Please create it before running this script." >&2
  exit 1
fi

required_patterns=(
"*.png filter=lfs diff=lfs merge=lfs -text"
"*.jpg filter=lfs diff=lfs merge=lfs -text"
"*.jpeg filter=lfs diff=lfs merge=lfs -text"
"*.gif filter=lfs diff=lfs merge=lfs -text"
"*.webp filter=lfs diff=lfs merge=lfs -text"
"*.tif filter=lfs diff=lfs merge=lfs -text"
"*.tiff filter=lfs diff=lfs merge=lfs -text"
"*.pdf filter=lfs diff=lfs merge=lfs -text"
"*.zip filter=lfs diff=lfs merge=lfs -text"
"*.7z filter=lfs diff=lfs merge=lfs -text"
"*.tar filter=lfs diff=lfs merge=lfs -text"
"*.tar.gz filter=lfs diff=lfs merge=lfs -text"
"*.mp4 filter=lfs diff=lfs merge=lfs -text"
"*.mov filter=lfs diff=lfs merge=lfs -text"
"*.mp3 filter=lfs diff=lfs merge=lfs -text"
"*.wav filter=lfs diff=lfs merge=lfs -text"
"*.onnx filter=lfs diff=lfs merge=lfs -text"
"*.pt filter=lfs diff=lfs merge=lfs -text"
"*.pth filter=lfs diff=lfs merge=lfs -text"
"*.h5 filter=lfs diff=lfs merge=lfs -text"
"*.bin filter=lfs diff=lfs merge=lfs -text"
"*.obj filter=lfs diff=lfs merge=lfs -text"
"*.glb filter=lfs diff=lfs merge=lfs -text"
"*.gltf filter=lfs diff=lfs merge=lfs -text"
)

missing=()
for pattern in "${required_patterns[@]}"; do
  if ! grep -Fxq "$pattern" .gitattributes; then
    missing+=("$pattern")
  fi
done

if [[ ${#missing[@]} -gt 0 ]]; then
  echo "[setup-lfs] Error: the following patterns are missing from .gitattributes:" >&2
  for pattern in "${missing[@]}"; do
    echo "  - $pattern" >&2
  done
  exit 1
fi

echo "[setup-lfs] .gitattributes contains the required LFS patterns."

if [[ -n "$(git status --porcelain -- .gitattributes)" ]]; then
  echo "[setup-lfs] Adding .gitattributes to the index."
  git add .gitattributes
else
  echo "[setup-lfs] .gitattributes already staged with the expected content."
fi

echo "[setup-lfs] Done."
