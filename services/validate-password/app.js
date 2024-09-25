const { apiRequestData, apiResponse } = require('../../libs/api-helper');
const { MESSAGE } = require('./constants');
const { getData } = require('./core/get-data');

module.exports.handler = async (event) => {
  const data = apiRequestData(event);

  // Validate required fields
  if (!data || !data.password || !data.token) {
    return apiResponse({ message: MESSAGE.BAD_REQUEST }, 400);
  }

  // Get stored data for password validation
  const result = await getData(data.password, data.token);

  // Validate stored data
  if (!result) return apiResponse({ message: MESSAGE.ERROR }, 500);
  if (!result.data) return apiResponse({ message: MESSAGE.UNAUTHORIZED }, 401);

  // Returns success message
  return apiResponse({ message: MESSAGE.SUCCESS });
};
