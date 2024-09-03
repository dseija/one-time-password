const { apiRequestData, apiResponse } = require('../../libs/api-helper');
const { emailIsValid } = require('../../libs/validation-helper');
const { MESSAGE } = require('./constants');
const { sendPassword } = require('./core/send-password');

module.exports.handler = async (event) => {
  const data = apiRequestData(event);
  if (!data) return apiResponse({ message: MESSAGE.BAD_REQUEST }, 400);
  if (!emailIsValid(data.email)) {
    return apiResponse({ message: MESSAGE.INVALID_EMAIL }, 422);
  }

  // TODO: Create unique password and token
  const password = '123456';
  const token = 'SECRET_TOKEN';

  sendPassword(password);

  return apiResponse({ message: MESSAGE.SUCCESS, token });
};
