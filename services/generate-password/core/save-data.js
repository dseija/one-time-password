const db = require('../../../libs/db-helper');
const { getCompoundKey } = require('../../../libs/token-helper');

module.exports.saveData = async (email, password, token) => {
  const data = {
    pk: getCompoundKey(token, password),
    email,
    expiresAt: new Date().getTime() + process.env.EXPIRE_MINUTES * 60 * 1000,
  };

  const result = await db.addRecord(process.env.DB_TABLE, data);

  return result;
};
