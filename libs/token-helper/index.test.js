const { getRandomToken, getCompoundKey } = require('.');

describe('Token Helper', () => {
  describe('getRandomToken', () => {
    it('should return a string token with length defined', () => {
      const token = getRandomToken(12);
      expect(typeof token).toEqual('string');
      expect(token).toHaveLength(12);
    });
  });

  describe('getCompoundKey', () => {
    it('should return a compound string from many keys', () => {
      const key = getCompoundKey('k1', 'k2');
      expect(typeof key).toEqual('string');
      expect(key).toEqual('k1-k2');
    });
  });
});
