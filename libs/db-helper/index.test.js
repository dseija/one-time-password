jest.mock('@aws-sdk/lib-dynamodb', () => ({
  DynamoDBDocument: {
    from: jest.fn(() => ({
      put: jest.fn(),
    })),
  },
}));

jest.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: jest.fn(() => ({})),
}));

const { getDbClient, addRecord } = require('.');

describe('DB Helper', () => {
  beforeEach(() => {
    mockPut = getDbClient().put;
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
});
