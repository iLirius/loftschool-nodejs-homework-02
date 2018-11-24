const fs = require('fs');
const path = require('path');

// Developers requires
const fl = require('../firstLetter');
const write = require('./write');
const reader = require('./reader');
/**
 * Ф-я чтения и записи файла в директорию.
 * @param {string} sourceDir Название директории источника
 * @param {string} destDir Название директории назначение
 * @param {string} file Название файла для для R/W
 * @returns {void}
 */
const copy = async (sourceDir, destDir, file) => {
  destDir = path.join(destDir, fl(file));
  const sourceFile = path.join(sourceDir, file);
  const destFile = path.join(destDir, file);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  }

  await reader(sourceFile).then(data => {
    write(destFile, data);
  });

  return true;
};

module.exports = copy;
