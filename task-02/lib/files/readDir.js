const fs = require('fs');
const path = require('path');

// Developers requires
const copy = require('./copy');

/**
 * Ф-я синхронного рекурсивного чтения директории
 * @param {string} source
 * @param {string} dest
 * @returns {void} void
 */
function readDir(source, dest) {
  return new Promise((resolve, reject) => {
    try {
      fs.readdirSync(source).forEach(item => {
        const state = fs.statSync(path.join(source, item));
        if (state.isDirectory()) {
          const localBase = path.join(source, item);
          readDir(localBase, dest).then((res) => {
            if (res) {
              console.log(path.relative(process.cwd(), source), '[done]');
            }
          });
        } else {
          copy(source, dest, item);
        }
      });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = readDir;
