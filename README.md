# think-babel

[![Build Status](https://img.shields.io/travis/com/liuliangsir/think-babel/master.svg)](https://travis-ci.com/liuliangsir/think-babel)
[![Coverage Status](https://coveralls.io/repos/github/liuliangsir/think-babel/badge.svg?branch=master)](https://coveralls.io/github/liuliangsir/think-babel)
[![npm version](https://badge.fury.io/js/%40w3ctech-editorial-department%2Fthink-babel.svg)](https://www.npmjs.com/package/@w3ctech-editorial-department/think-babel)

`think-babel` transpile ES6+ file to ES5

## Syntax

```js
import thinkBabel from 'think-babel';
thinkBabel({
  srcPath,
  outPath,
  file,
  options,
  ext,
});

```

- `srcPath`      {String} the file source path.
- `outPath`      {String} the directory for output file.
- `file`         {String} the file path in the 'srcPath'.
- `[options]` {Object} the babel options,default

  ```js
  {
    filename: file,
    sourceFileName: path.join(srcPath, file),
    presets: ['es2015'],
    sourceMaps: true,
    babelrc: false
  }
  ```

- `[ext]`        {String} the new file extension,default `.js`.

## Usage

Transform ES6+ file to ES5:

```js
import thinkBabel from 'think-babel';

thinkBabel({
  srcPath: './test/src/a',
  outPath: './test/out',
  file: 'b/test.es'
});

```
