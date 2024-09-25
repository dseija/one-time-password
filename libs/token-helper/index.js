const crypto = require('crypto');

const getRandomToken = (length) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
};

const getCompoundKey = (...keys) => {
  return keys.join('-');
};

module.exports = { getRandomToken, getCompoundKey };
