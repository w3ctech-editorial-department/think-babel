/*
* @Author: lushijie
* @Date:   2017-02-14 10:56:08
* @Last Modified by:   lushijie
* @Last Modified time: 2017-02-15 20:39:36
*/
import test from 'ava'
import helper from 'think-helper'
import compileFileByBabel from '../index'
import path from 'path'
import fs from 'fs'

test.serial.cb.beforeEach(t => {
  let outPath = path.join(__dirname, 'out');
  helper.rmdir(outPath, false).then(() => {
    t.end();
  });
});

test.serial('compileFileByBabel sourceMaps=true', t => {
  let out = compileFileByBabel({
    srcPath: './test/src/a',
    outPath: './test/out',
    file: 'b/test.es',
    ext: '.js',
    babelOptions: {
      presets: ['es2015', 'stage-1'],
      plugins: ['transform-runtime'],
      sourceMaps: true
    }
  });
  let outFile = helper.isFile(path.join(__dirname, 'out/b/test.js'));
  let outMapFile = helper.isFile(path.join(__dirname, 'out/b/test.js.map'));
  t.true(out && outFile && outMapFile);
});


test.serial('compileFileByBabel ext=.js2', t => {
  let out = compileFileByBabel({
    srcPath: './test/src/a',
    outPath: './test/out',
    file: 'b/test.es',
    ext: '.js2',
    babelOptions: {
      presets: ['es2015', 'stage-1'],
      plugins: ['transform-runtime'],
      sourceMaps: false
    }
  });
  let outFile = helper.isFile(path.join(__dirname, 'out/b/test.js2'));
  let outMapFile = helper.isFile(path.join(__dirname, 'out/b/test.js2.map'));
  t.true(out && outFile && !outMapFile);
});
