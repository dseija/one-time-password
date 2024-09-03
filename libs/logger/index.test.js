const logger = require('./');

describe('Logger', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('should log default', () => {
    logger.log();

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should log custom message', () => {
    logger.log('test message', 'log');

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should use .log() when passed wrong type', () => {
    logger.log('test message', 'call');

    expect(consoleSpy).toHaveBeenCalled();
  });
});
