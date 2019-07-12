const { resolve } = require("path");
const { readdirSync, readFileSync, writeFileSync } = require("fs");
const mkdirp = require('mkdirp');
const postcss = require("postcss");
const atImport = require("postcss-import");
const cssnano = require("cssnano");

exports.copyHLStyle = function(dest) {
  const TARGET_DIR = resolve(__dirname, "../node_modules/highlight.js/styles");
  const DEST_DIR = dest || resolve(__dirname, "../hl-style");
  const rawFiles = readdirSync(TARGET_DIR);
  const wantedFiles = rawFiles.filter(n => n.match(/\.css$/));

  try {
    mkdirp.sync(DEST_DIR);
  } catch (e) {}

  (async () => {
    for (const file of wantedFiles) {
      const content = readFileSync(resolve(TARGET_DIR, file)).toString();
      const result = await postcss()
        .use(atImport())
        .use(
          cssnano({
            preset: "default"
          })
        )
        .process(content, {
          from: resolve(TARGET_DIR, file),
          to: resolve(DEST_DIR, file)
        })
        .catch(e => {
          console.error(e);
        });

      if (result && result.css)
        writeFileSync(resolve(DEST_DIR, file), result.css);
    }
  })();

  return wantedFiles.map(n => n.replace(/\.css$/, ""));
};
