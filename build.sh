#!/bin/bash

HERE="$(cd "$(dirname "$0")" && pwd)"

which md >/dev/null || {
  echo "You need to install 'md' from https://github.com/benchristel/markdown-renderer first"
  exit 1
}

cd "$HERE/src"

find -type f -name '*.md' \
  | (while read srcpath; do
      mkdir -p "$HERE/docs/$(dirname "$srcpath")"
      <"$srcpath" md | template "$HERE/templates/page.html" >"$HERE/docs/${srcpath%.md}.html"
    done)
