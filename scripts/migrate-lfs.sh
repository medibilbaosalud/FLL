#!/usr/bin/env bash
set -euo pipefail

# Migrate existing binary history to Git LFS for the current branch.

usage() {
  cat <<USAGE
Usage: bash scripts/migrate-lfs.sh [--include "pattern1,pattern2"]
USAGE
}

default_patterns=(
"*.png"
"*.jpg"
"*.jpeg"
"*.gif"
"*.webp"
"*.tif"
"*.tiff"
"*.pdf"
"*.zip"
"*.7z"
"*.tar"
"*.tar.gz"
"*.mp4"
"*.mov"
"*.mp3"
"*.wav"
"*.onnx"
"*.pt"
"*.pth"
"*.h5"
"*.bin"
"*.obj"
"*.glb"
"*.gltf"
)

include_patterns=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --include)
      shift
      if [[ $# -eq 0 ]]; then
        echo "[migrate-lfs] Error: --include requires a comma-separated list of patterns." >&2
        usage >&2
        exit 1
      fi
      include_patterns="$1"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "[migrate-lfs] Unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

if [[ -z "$include_patterns" ]]; then
  include_patterns=$(IFS=','; echo "${default_patterns[*]}")
fi

current_branch=$(git rev-parse --abbrev-ref HEAD)

echo "[migrate-lfs] Preparing to migrate binaries on branch '$current_branch'."
echo "[migrate-lfs] Patterns: $include_patterns"
echo "[migrate-lfs] This rewrites commits on the current branch only. Make sure your work is backed up."

git lfs install

echo "[migrate-lfs] Running git lfs migrate import..."
git lfs migrate import --include="$include_patterns"

echo "[migrate-lfs] Migration complete on branch '$current_branch'."
echo "[migrate-lfs] Review the changes, run your tests, and commit the updated pointers."
echo "[migrate-lfs] Push your branch with: git push -u origin $current_branch (use --force only for this branch if required)."
