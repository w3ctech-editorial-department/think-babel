const babelCore = require('@babel/core');
const helper = require('think-helper');
const fs = require('fs');
const path = require('path');

/**
 * compile es6+ file to es5
 * @param  {Object} options
 * @return {Boolean}
 */
function babelTranspile(config) {
  const {srcPath, outPath, file: filename, ext = '.js'} = config;

  const srcAbsolutePath = path.join(srcPath, filename);
  const outputAbsolutePath = path.join(outPath, filename);
  const relativePath = path.relative(path.dirname(outputAbsolutePath), srcAbsolutePath);

  // babel options
  let {options} = config;
  options = Object.assign({
    filename,
    sourceFileName: relativePath,
    sourceMaps: true,
    babelrc: false
  }, options);

  // babel transform
  let data;
  try {
    const content = fs.readFileSync(srcAbsolutePath, 'utf8');
    data = babelCore.transform(content, options);
  } catch (e) {
    return e;
  }

  // write es5 code file
  const outFile = outputAbsolutePath.replace(/\.\w+$/, ext);
  helper.mkdir(path.dirname(outFile));

  const basename = path.basename(filename).replace(/\.\w+$/, ext);
  const prefix = '//# sourceMappingURL=';
  if (data.code.indexOf(prefix) < 0 && options.sourceMaps) {
    data.code = data.code + '\n' + prefix + basename + '.map';
  }
  fs.writeFileSync(outFile, data.code);

  // write souremap file
  if (options.sourceMaps) {
    const sourceMap = data.map;
    sourceMap.file = sourceMap.sources[0];
    fs.writeFileSync(outFile + '.map', JSON.stringify(sourceMap, undefined, 4));
  }
  return true;
}

module.exports = babelTranspile;
