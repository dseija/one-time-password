const logger = require('../logger');

const apiRequestData = (event) => {
  try {
    return JSON.parse(event.body);
  } catch (e) {
    logger.log(e.stack, 'error');
    return;
  }
};

const apiResponse = (bodyData, statusCode = 200) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(bodyData),
  };
};

module.exports = { apiRequestData, apiResponse };
