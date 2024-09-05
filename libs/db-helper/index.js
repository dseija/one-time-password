const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const logger = require('../logger');

let dbClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const addRecord = async (tableName, recordData) => {
  let result;
  try {
    result = await dbClient.send(
      new PutCommand({
        Item: recordData,
        ReturnConsumedCapacity: 'TOTAL',
        TableName: tableName,
      })
    );
  } catch (e) {
    logger.log(e.stack, 'error');
  }

  return result;
};

module.exports = { addRecord };
