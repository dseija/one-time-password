const { handler } = require('./app');
const SaveData = require('./core/save-data');
const SendPassword = require('./core/send-password');

jest.mock('./core/save-data');
jest.mock('./core/send-password');

describe('GeneratePassword Service', () => {
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

  describe('wrong request', () => {
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

  describe('good request', () => {
    const event = { ...defaultEvent };
    event.body = JSON.stringify({ email: EMAIL_OK });

    it('should return 500 if saveData() fails', async () => {
      const saveDataMock = jest
        .spyOn(SaveData, 'saveData')
        .mockImplementation(() => undefined);

      const response = await handler(event);

      expect(saveDataMock).toHaveBeenCalled();
      expect(response.statusCode).toEqual(500);
    });

    it('should return 500 if sendPassword() fails', async () => {
      const saveDataMock = jest
        .spyOn(SaveData, 'saveData')
        .mockImplementation(() => true);
      const sendPasswordMock = jest
        .spyOn(SendPassword, 'sendPassword')
        .mockImplementation(() => undefined);

      const response = await handler(event);

      expect(saveDataMock).toHaveBeenCalled();
      expect(sendPasswordMock).toHaveBeenCalled();
      expect(response.statusCode).toEqual(500);
    });

    it('should return token', async () => {
      const saveDataMock = jest
        .spyOn(SaveData, 'saveData')
        .mockImplementation(() => true);
      const sendPasswordMock = jest
        .spyOn(SendPassword, 'sendPassword')
        .mockImplementation(() => true);

      const response = await handler(event);
      const body = JSON.parse(response.body);

      expect(saveDataMock).toHaveBeenCalled();
      expect(sendPasswordMock).toHaveBeenCalled();
      expect(typeof body.token).toEqual('string');
    });
  });
});
