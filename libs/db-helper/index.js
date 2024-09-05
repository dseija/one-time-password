const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const logger = require('../logger');

let dbClient;

const getDbClient = () => {
  if (!dbClient) {
    dbClient = DynamoDBDocument.from(new DynamoDBClient({}));
  }
  return dbClient;
};

const addRecord = async (tableName, recordData) => {
  let result;
  try {
    result = await getDbClient().put({
      Item: recordData,
      ReturnConsumedCapacity: 'TOTAL',
      TableName: tableName,
    });
  } catch (e) {
    logger.log(e.stack, 'error');
  }

  return result;
};

module.exports = { getDbClient, addRecord };
