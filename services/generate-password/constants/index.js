const MESSAGE = {
  BAD_REQUEST: 'Error: Bad Request.',
  INVALID_EMAIL: 'Error: Email field is required and must be valid.',
  ERROR: 'Error: Operation failed.',
  SUCCESS: 'Password generated successfully! Please check your email.',
};

const CONFIG = {
  PASSWORD_LENGTH: 8,
  TOKEN_LENGTH: 32,
};

module.exports = { MESSAGE, CONFIG };
