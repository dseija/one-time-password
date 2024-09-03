const { handler, sendPassword } = require('./app');

describe('Generate Password Service', () => {
  const EMAIL_OK = 'email@test.com';
  const EMAIL_EMPTY = '';
  const EMAIL_INVALID = '@invalid';
  const defaultEvent = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: {},
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('not accepted request', () => {
    const event = { ...defaultEvent };

    it('should return statusCode 400 with empty email', async () => {
      event.body.email = EMAIL_EMPTY;

      const response = await handler(event);
      expect(response.statusCode).toEqual(400);
    });

    it('should return statusCode 400 with invalid email', async () => {
      event.body.email = EMAIL_INVALID;

      const response = await handler(event);
      expect(response.statusCode).toEqual(400);
    });
  });

  describe('receive email and generate password', () => {
    const event = { ...defaultEvent };
    event.body.email = EMAIL_OK;

    it('should call sendPassword()', async () => {
      await handler(event);
      expect(sendPassword).toHaveBeenCalled();
    });

    it('should return token', async () => {
      const response = await handler(event);
      expect(typeof response.token).toEqual('string');
      expect(response.token).not.toHaveLength(0);
    });
  });
});
