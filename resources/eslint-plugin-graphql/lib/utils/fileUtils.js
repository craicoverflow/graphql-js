// @flow strict

'use strict';

const { join } = require('path');
const { sync } = require('glob');
const { readFileSync } = require('fs');

function isFunctionPublic(node, filename) {
  const funcName = node.id.name;

  const indexFiles = getIndexFiles();

  let is = false;
  const file = readFileSync(indexFiles[0], 'utf8');

  if (isNameInExports(funcName, file)) {
    is = true;
  }

  return is;
}

function isFunctionAnnotated(jsDocs) {
  if (!jsDocs) {
    return false;
  }

  let docsArr;
  let annotation;

  if (jsDocs.type === 'Block') {
    docsArr = jsDocs.value.split('\n');

    annotation = docsArr.find(d => d.trimLeft().startsWith('* @internal'));
  }

  return Boolean(annotation);
}

function isNameInExports(name, file) {
  if (file.indexOf(name) >= 0) {
    return true;
  }
  return false;
}

function getIndexFiles() {
  return sync(join(process.cwd(), 'src/index.js'));
}

module.exports = { isFunctionPublic, isFunctionAnnotated };
