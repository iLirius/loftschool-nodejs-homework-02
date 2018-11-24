const fs = require('fs');

/**
 * Рекурсивно удаляет директории
 * @param {string} path Путь для удаления
 */
const deleteFolderRecursive = async (path) => {
  if (fs.existsSync(path)) {
    await fs.readdirSync(path).forEach(function (file) {
      const curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    await fs.rmdirSync(path);
  }
  return true;
};

module.exports = deleteFolderRecursive;
