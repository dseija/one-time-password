const { saveData } = require('./save-data');

describe('saveData', () => {
  it('should returns something', async () => {
    const saved = await saveData('test@email.com', '123456', 'SECRET_TOKEN');
    expect(saved).not.toBeUndefined();
  });
});
