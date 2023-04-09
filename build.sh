#!/bin/bash

export ROOT="$(cd "$(dirname "$0")" && pwd)"
export PATH="$ROOT/bin:$PATH"

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

rm -rf "$ROOT/docs/assets"
cp -r "$ROOT/assets" "$ROOT/docs/assets"

find "$ROOT/docs" -type d \
  | (while read dir; do
    if ! [ -e "$dir/index.html" ]; then
      ln -s ../index.html "$dir/index.html"
    fi
  done)