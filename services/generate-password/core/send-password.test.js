const { sendPassword } = require('./send-password');

describe('sendPassword', () => {
  it('should returns something', async () => {
    const sent = await sendPassword('test@email.com', '123456');
    expect(sent).not.toBeUndefined();
  });
});
