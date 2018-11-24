const fs = require('fs');

/**
 * Чтение файла
 * @param {string} sourceFile
 * @returns {any}
 */
const reader = async (sourceFile) => {
  let data;
  try {
    data = await fs.readFileSync(sourceFile);
  } catch (error) {
    throw 'Ошибка записи';
  }
  return data;
};

module.exports = reader;
