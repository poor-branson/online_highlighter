import hljs from "highlight.js";
import debounce from 'debounce';

function swapLang(lang) {
  document.querySelector('.code').className = `code ${lang}`;
  render();
}

function swapStyle(name) {
  let linkTag = document.querySelector("link[data-highlight]");
  if (!linkTag) {
    linkTag = document.createElement("link");
    linkTag.rel = "stylesheet";
    linkTag.setAttribute("data-highlight", 1);
    document.head.append(linkTag);
  }

  linkTag.href = `hl-style/${name}.css`;
}

function render() {
  const code = document.querySelector('textarea').value;
  document.querySelector('.code').innerText = code;
  hljs.highlightBlock(document.querySelector('.code'));
}

swapStyle('a11y-dark');

document.querySelector("select[name=themes]").append(
  /** injected variable */
  ...__THEME_LIST__.map(name => {
    const option = document.createElement("option");
    option.value = name;
    option.innerHTML = name;
    return option;
  })
);
document.querySelector('select[name=languages]').append(
  ...hljs.listLanguages().sort().map(lang => {
    const option = document.createElement("option");
    option.value = lang;
    option.innerHTML = lang;
    return option;
  })
)

document.querySelector("select[name=themes]").onchange = function(e) {
  swapStyle(e.target.value);
};

document.querySelector('select[name=languages]').onchange = function(e) {
  swapLang(e.target.value);
}

document.querySelector('textarea').oninput = debounce(render, 400);

