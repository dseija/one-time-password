const { handler } = require('./app');
const SendPassword = require('./core/send-password');

jest.mock('./core/send-password');

describe('Generate Password Service', () => {
  const EMAIL_OK = 'email@test.com';
  const EMAIL_INVALID = '@invalid';
  const defaultEvent = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('not accepted request', () => {
    const event = { ...defaultEvent };

    it('should return statusCode 400 with wrong body', async () => {
      event.body = {};

      const response = await handler(event);
      expect(response.statusCode).toEqual(400);
    });

    it('should return statusCode 422 with invalid email', async () => {
      event.body = JSON.stringify({ email: EMAIL_INVALID });

      const response = await handler(event);
      expect(response.statusCode).toEqual(422);
    });
  });

  describe('receive email and generate password', () => {
    const event = { ...defaultEvent };
    event.body = JSON.stringify({ email: EMAIL_OK });

    it('should call sendPassword()', async () => {
      await handler(event);
      const sendPasswordMock = jest.spyOn(SendPassword, 'sendPassword');
      expect(sendPasswordMock).toHaveBeenCalled();
    });

    it('should return token', async () => {
      const response = await handler(event);
      const body = JSON.parse(response.body);
      expect(typeof body.token).toEqual('string');
      expect(body.token).not.toHaveLength(0);
    });
  });
});
