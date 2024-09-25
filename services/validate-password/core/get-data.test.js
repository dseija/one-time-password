const db = require('../../../libs/db-helper');
const { getData } = require('./get-data');

jest.mock('../../../libs/db-helper');

describe('getData', () => {
  let getRecordsMock;

  beforeEach(() => {
    getRecordsMock = jest.spyOn(db, 'getRecords');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return undefined if there is an error', async () => {
    getRecordsMock.mockImplementation(() => undefined);
    const result = await getData();
    expect(getRecordsMock).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('should not return undefined', async () => {
    getRecordsMock.mockImplementation(() => ({ Items: [] }));
    const result = await getData('123456', 'SECRET_TOKEN');
    expect(getRecordsMock).toHaveBeenCalled();
    expect(result.data).toBeUndefined();
  });

  it('should not return undefined', async () => {
    getRecordsMock.mockImplementation(() => ({ Items: [{}] }));
    const result = await getData('123456', 'SECRET_TOKEN');
    expect(getRecordsMock).toHaveBeenCalled();
    expect(result.data).not.toBeUndefined();
  });
});
