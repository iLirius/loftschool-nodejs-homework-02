const fs = require('fs');

/**
 * Запись файла
 * @param {string} dest пусть
 * @param {any} data данные
 * @returns {boolean}
 */
const write = async (dest, data) => {
  try {
    await fs.writeFileSync(dest, data);
  } catch (error) {
    // throw `Ошибка чтения ${dest}`;
    return false;
  }
  return true;
};

module.exports = write;
