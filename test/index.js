/*
* @Author: lushijie
* @Date:   2017-02-14 10:56:08
* @Last Modified by:   lushijie
* @Last Modified time: 2017-02-21 14:07:08
*/
import test from 'ava'
import helper from 'think-helper'
import thinkBabel from '../index'
import path from 'path'
import fs from 'fs'

test.serial.cb.beforeEach(t => {
  let outPath = path.join(__dirname, 'out');
  helper.rmdir(outPath, false).then(() => {
    t.end();
  });
});

test.serial('thinkBabel-1', t => {
  let out = thinkBabel({
    srcPath: './test/src/a',
    outPath: './test/out',
    file: 'b/test.es'
  });
  let outFile = helper.isFile(path.join(__dirname, 'out/b/test.js'));
  let outMapFile = helper.isFile(path.join(__dirname, 'out/b/test.js.map'));
  t.true(out && outFile && outMapFile);
});

test.serial('thinkBabel-2', t => {
  let out = thinkBabel({
    srcPath: './test/src/a',
    outPath: './test/out',
    file: 'b/test.es',
    babelOptions: {
      sourceMaps: false
    }
  });
  let outFile = helper.isFile(path.join(__dirname, 'out/b/test.js'));
  let outMapFile = helper.isFile(path.join(__dirname, 'out/b/test.js.map'));
  t.true(out && outFile && !outMapFile);
});


test.serial('thinkBabel-3', t => {
  let out = thinkBabel({
    srcPath: './test/src/a',
    outPath: './test/out',
    file: 'b/test.es',
    ext: '.js2'
  });
  let outFile = helper.isFile(path.join(__dirname, 'out/b/test.js2'));
  let outMapFile = helper.isFile(path.join(__dirname, 'out/b/test.js2.map'));
  t.true(out && outFile && outMapFile);
});


let wrongSyntax = 'let a == 123;';
test.serial('thinkBabel-4', t => {
  let testFilePath = path.join(__dirname, './src/a/b/test.es');
  fs.appendFileSync(testFilePath, wrongSyntax);
  let out = thinkBabel({
    srcPath: './test/src/a',
    outPath: './test/out',
    file: 'b/test.es'
  });

  var originData = fs.readFileSync(testFilePath, 'utf8').replace(wrongSyntax, '');
  fs.writeFileSync(testFilePath, originData);
  t.true(helper.isError(out));
});
