const { getRandomToken } = require('.');

describe('Token Helper', () => {
  describe('getRandomToken', () => {
    it('should return a string token with length defined', () => {
      const token = getRandomToken(12);
      expect(typeof token).toEqual('string');
      expect(token).toHaveLength(12);
    });
  });
});
