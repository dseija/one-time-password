const { apiRequestData, apiResponse } = require('../../libs/api-helper');
const { emailIsValid } = require('../../libs/validation-helper');
const { getRandomToken } = require('../../libs/token-helper');
const { MESSAGE, CONFIG } = require('./constants');
const { saveData } = require('./core/save-data');
const { sendPassword } = require('./core/send-password');

module.exports.handler = async (event) => {
  const data = apiRequestData(event);

  // Validate required fields
  if (!data) return apiResponse({ message: MESSAGE.BAD_REQUEST }, 400);
  if (!emailIsValid(data.email)) {
    return apiResponse({ message: MESSAGE.INVALID_EMAIL }, 422);
  }

  // Generate password and session token
  const password = getRandomToken(CONFIG.PASSWORD_LENGTH);
  const token = getRandomToken(CONFIG.TOKEN_LENGTH);

  // Store user data for future password validation
  const dataSaved = await saveData(data.email, password, token);
  if (!dataSaved) return apiResponse({ message: MESSAGE.ERROR }, 500);

  // Send password to the user (email)
  const passwordSent = await sendPassword(password);
  if (!passwordSent) return apiResponse({ message: MESSAGE.ERROR }, 500);

  // Returns session token
  return apiResponse({ message: MESSAGE.SUCCESS, token });
};
