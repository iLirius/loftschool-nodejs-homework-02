const _deleteFolderRecursive = require('./deleteDir');
const _readWrite = require('./readWrite');
const _readDir = require('./readDir');

module.exports = {
  readDir: _readDir
  ,readWrite: _readWrite
  ,deleteFolderRecursive: _deleteFolderRecursive
};
