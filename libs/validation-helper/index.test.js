const { emailIsValid } = require('./');

describe('Validation Helper', () => {
  describe('emailIsValid', () => {
    it('should return true if the email is valid', () => {
      const result = emailIsValid('test@email.com');
      expect(result).toEqual(true);
    });

    it('should return false if the email is not valid', () => {
      const result = emailIsValid('testmail');
      expect(result).toEqual(false);
    });
  });
});
