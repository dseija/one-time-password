const db = require('../../../libs/db-helper');
const { getCompoundKey } = require('../../../libs/token-helper');

module.exports.getData = async (password, token) => {
  const result = await db.getRecords(
    process.env.DB_TABLE,
    'pk',
    getCompoundKey(token, password)
  );

  if (!result) return;

  const data = result.Items[0];
  if (!data || data.expiresAt < new Date().getTime()) {
    return { data: undefined };
  }

  return { data };
};
