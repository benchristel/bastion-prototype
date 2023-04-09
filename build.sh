#!/bin/bash

export ROOT="$(cd "$(dirname "$0")" && pwd)"
export PATH="$ROOT/bin:$PATH"

which md >/dev/null || {
  echo "You need to install 'md' from https://github.com/benchristel/markdown-renderer first"
  exit 1
}

cd "$ROOT/src"

find -type d \
  | (while read dir; do
    if ! [ -f "$dir/index.md" ] || grep -q "<!--default-index-->" "$dir/index.md"; then
      <"$ROOT/templates/default-index.md" sed -e "s|%PATH%|$dir|" >"$dir/index.md"
    fi
  done)

find -type f -name '*.md' \
  | (while read srcpath; do
      mkdir -p "$ROOT/docs/$(dirname "$srcpath")"
      pushd "$(dirname "$srcpath")" >/dev/null
      <"$(basename "$srcpath")" \
        perl -pe 's[<!--%(.*)-->][ qx($1) ]ge' \
        | md \
        | template "$ROOT/templates/page.html" \
        >"$ROOT/docs/${srcpath%.md}.html"
      popd >/dev/null
    done)

rm -rf "$ROOT/docs/assets"
cp -r "$ROOT/assets" "$ROOT/docs/assets"