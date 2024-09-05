const { DynamoDB } = require('aws-sdk');
const logger = require('../logger');

let docClientInstance;

const getInstance = () => {
  if (!docClientInstance) docClientInstance = new DynamoDB.DocumentClient();

  return docClientInstance;
};

const addRecord = async (tableName, recordData) => {
  const docClient = getInstance();
  let result;
  try {
    result = await docClient
      .put({
        Item: recordData,
        ReturnConsumedCapacity: 'TOTAL',
        TableName: tableName,
      })
      .promise();
  } catch (e) {
    logger.log(e.stack, 'error');
  }

  return result;
};

module.exports = { getInstance, addRecord };
