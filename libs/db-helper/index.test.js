jest.mock('@aws-sdk/lib-dynamodb', () => ({
  DynamoDBDocument: {
    from: jest.fn(() => ({
      put: jest.fn(),
      query: jest.fn(),
    })),
  },
}));

jest.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: jest.fn(() => ({})),
}));

const { getDbClient, addRecord, getRecords } = require('.');

describe('DB Helper', () => {
  let mockPut, mockQuery;

  beforeEach(() => {
    mockPut = getDbClient().put;
    mockQuery = getDbClient().query;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addRecord', () => {
    const tableName = 'TestTable';
    const recordData = { pk: '123', email: 'test@email.com' };

    it('should handle error', async () => {
      mockPut.mockRejectedValue(new Error('DB Error'));

      const result = await addRecord(tableName, recordData);

      expect(result).toBeUndefined();
    });

    it('should successfully add a record', async () => {
      const mockResult = { ConsumedCapacity: 'TOTAL' };

      mockPut.mockResolvedValue(mockResult);

      const result = await addRecord(tableName, recordData);

      expect(mockPut).toHaveBeenCalled();
      expect(result).toBe(mockResult);
    });
  });

  describe('getRecords', () => {
    const tableName = 'TestTable';
    const recordData = { pk: '123' };

    it('should handle error', async () => {
      mockQuery.mockRejectedValue(new Error('DB Error'));

      const result = await getRecords(tableName, recordData);

      expect(result).toBeUndefined();
    });

    it('should successfully get a record', async () => {
      const mockResult = { Items: [{}] };

      mockQuery.mockResolvedValue(mockResult);

      const result = await getRecords(tableName, recordData);

      expect(mockQuery).toHaveBeenCalled();
      expect(result).toBe(mockResult);
    });
  });
});
