const { handler } = require('./app');
const GetData = require('./core/get-data');

jest.mock('./core/get-data');

describe('ValidatePassword Service', () => {
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

    it('should return statusCode 400 with empty password', async () => {
      event.body = JSON.stringify({ password: '', token: 'SECRET_TOKEN' });

      const response = await handler(event);
      expect(response.statusCode).toEqual(400);
    });

    it('should return statusCode 400 with empty token', async () => {
      event.body = JSON.stringify({ password: '123456', token: '' });

      const response = await handler(event);
      expect(response.statusCode).toEqual(400);
    });
  });

  describe('good request', () => {
    const event = { ...defaultEvent };
    event.body = JSON.stringify({ password: '123456', token: 'SECRET_TOKEN' });

    it('should return 500 if getData() fails', async () => {
      const getDataMock = jest
        .spyOn(GetData, 'getData')
        .mockImplementation(() => undefined);

      const response = await handler(event);

      expect(getDataMock).toHaveBeenCalled();
      expect(response.statusCode).toEqual(500);
    });

    it('should return 401 if getData() does not have data property', async () => {
      const getDataMock = jest
        .spyOn(GetData, 'getData')
        .mockImplementation(() => ({ data: undefined }));

      const response = await handler(event);

      expect(getDataMock).toHaveBeenCalled();
      expect(response.statusCode).toEqual(401);
    });

    it('should return 200', async () => {
      const getDataMock = jest
        .spyOn(GetData, 'getData')
        .mockImplementation(() => ({ data: {} }));

      const response = await handler(event);

      expect(getDataMock).toHaveBeenCalled();
      expect(response.statusCode).toEqual(200);
    });
  });
});
