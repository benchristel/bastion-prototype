#!/bin/bash

export ROOT="$(cd "$(dirname "$0")" && pwd)"
export PATH="$ROOT/build:$PATH"

which md >/dev/null || {
  echo "You need to install 'md' from https://github.com/benchristel/markdown-renderer first"
  exit 1
}

cd "$ROOT/src"

find -type f -name '*.md' \
  | (while read srcpath; do
      mkdir -p "$ROOT/docs/$(dirname "$srcpath")"
      <"$srcpath" \
        perl -pe 's[<!--%(.*)-->][ qx($1) ]ge' \
        | md \
        | template "$ROOT/templates/page.html" \
        >"$ROOT/docs/${srcpath%.md}.html"
    done)
