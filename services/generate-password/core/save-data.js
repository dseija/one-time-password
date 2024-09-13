const db = require('../../../libs/db-helper');

module.exports.saveData = async (email, password, token) => {
  const data = {
    pk: `1TimePass_${token}-${password}`,
    email,
    expiresAt: new Date().getTime() + process.env.EXPIRE_MINUTES * 60 * 1000,
  };

  const result = await db.addRecord(process.env.DB_TABLE, data);

  return result;
};
