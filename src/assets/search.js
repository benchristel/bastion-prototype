const searchables = {
  "github": Searchable("https://github.com/search?q=%s"),
  "youtube": Searchable("https://youtube.com/results?search_query=%s"),
  "mdn": Searchable("https://duckduckgo.com/?q=%s", {prefix: "site:developer.mozilla.org"}),
  "npm": Searchable("https://www.npmjs.com/search?q=%s"),
  "duckduckgo": Searchable("https://duckduckgo.com/?q=%s"),
  "unicode": Searchable("https://www.fileformat.info/info/unicode/char/search.htm?q=%s&han=Y&preview=entity"),
  "man7": Searchable("https://duckduckgo.com/?q=%s", {prefix: "site:man7.org"}),
  "iconsdb": Searchable("https://www.iconsdb.com/black-icons/?search=%s"),
  "cornish": Searchable("https://cornishdictionary.org.uk/#%s"),
  "wikipedia": Searchable("https://en.wikipedia.org/w/index.php?search=%s"),
}
const DefaultSearchable = Searchable("#%s")

function setupOmnisearch(element) {
  const buttons = element.querySelectorAll("button")
  const searchInput = element.querySelector("input[type=search]")
  for (const button of buttons) {
    const searchable = searchables[button.className] ?? DefaultSearchable()
    button.addEventListener("click", () => {
      searchable.search(searchInput.value)
    })
  }
}

function Searchable(pattern, {prefix = ""} = {}) {
  return {
    search(query) {
      go(pattern.replace("%s", encodeURIComponent(prefix + " " + query)))
    }
  }
}

function go(url) {
  window.location = url
}