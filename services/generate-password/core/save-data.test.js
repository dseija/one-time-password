const db = require('../../../libs/db-helper');
const { saveData } = require('./save-data');

jest.mock('../../../libs/db-helper');

describe('saveData', () => {
  let addRecordMock;

  beforeEach(() => {
    addRecordMock = jest.spyOn(db, 'addRecord');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return undefined if there is an error', async () => {
    addRecordMock.mockImplementation(() => undefined);
    const saved = await saveData();
    expect(addRecordMock).toHaveBeenCalled();
    expect(saved).toBeUndefined();
  });

  it('should not return undefined', async () => {
    addRecordMock.mockImplementation(() => ({}));
    const saved = await saveData('test@email.com', '123456', 'SECRET_TOKEN');
    expect(addRecordMock).toHaveBeenCalled();
    expect(saved).not.toBeUndefined();
  });
});
