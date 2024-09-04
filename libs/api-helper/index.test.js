const apiHelper = require('./');

describe('API Helper', () => {
  describe('apiRequestData', () => {
    it('should handle error when event is not as expected', () => {
      const data = apiHelper.apiRequestData({});
      expect(data).toEqual(undefined);
    });

    it('should return event body parsed', () => {
      const data = apiHelper.apiRequestData({ body: '{"foo":"bar"}' });
      expect(data.foo).toEqual('bar');
    });
  });

  describe('apiResponse', () => {
    it('should return default statusCode', () => {
      const response = apiHelper.apiResponse();
      expect(response.statusCode).toEqual(200);
    });
  });
});
