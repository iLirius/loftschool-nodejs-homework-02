#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const optimist = require('optimist');
const scriptName = path.basename(__filename);

// Developers requires
const {
  readDir,
  deleteFolderRecursive
} = require('./src/files');

const argv = optimist.usage(`Usage: ${scriptName} [options]`)
  .demand(['s'])
  .options('s', {
    alias: 'source-dir'
  }).describe('s', 'Исходная директория которую надо сортировать <path>')
  .options('d', {
    alias: 'destination-dir'
  }).describe('t', 'Директория результат работы парсинга <path>')
  .default('t', './output')
  .options('r', {
    alias: 'rm'
  }).describe('r', 'Удалить исходную директорию')
  .default('r', false)
  .argv;

console.log(argv.s);

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


readDir(sourceDir, destDir);

console.log(deleteFolderRecursive);


// deleteFolderRecursive(sourceDir);
