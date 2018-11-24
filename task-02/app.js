#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const optimist = require('optimist');
const scriptName = path.basename(__filename);

// Developers requires
const readDir = require('./lib/files/readDir');
const deleteFolderRecursive = require('./lib/files/deleteDir');

const argv = optimist.usage(`Usage: ${scriptName} [options]`)
  .demand(['s'])
  .options('s', {
    alias: 'source-dir'
  }).describe('s', 'Исходная директория которую надо сортировать <path>')
  .default('s', './dir')
  .options('d', {
    alias: 'destination-dir'
  }).describe('d', 'Директория результат работы парсинга <path>')
  .default('d', './output')
  .options('r', {
    alias: 'rm'
  }).describe('r', 'Удалить исходную директорию')
  .default('r', false)
  .argv;

try {
  if (argv.s === void 0 || argv.s === true) {
    throw 502;
  }
  // Задание и нормализация начальных путей
  const dir = process.cwd();
  const sourceDir = path.resolve(dir, path.normalize(argv.s));
  const destDir = path.resolve(dir, path.normalize(argv.d));

  if (!fs.existsSync(sourceDir)) {
    process.exit(404);
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  }

  readDir(sourceDir, destDir).then((r) => {
    if (r) {
      console.log('all', 'done');
      if (argv.r) {
        console.log('Удаляем каталог...');
        deleteFolderRecursive(sourceDir).then((res) => {
          if (res) {
            console.log('Удаление завершено.');
          }
        }).catch((e) => {
          console.log(e);
        });
      }
    }
  }).catch(e => {
    console.log(e);
  });

} catch (error) {
  switch (error) {
  case 502:
    console.log('Параметр -s, --source-dir некорректно введен или пуст');
    break;
  default:
    break;
  }
}
