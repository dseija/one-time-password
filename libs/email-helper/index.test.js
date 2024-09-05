jest.mock('@aws-sdk/client-ses', () => ({
  SESClient: jest.fn(() => ({
    send: jest.fn(),
  })),
  SendEmailCommand: jest.fn(() => ({})),
}));

const { getSESClient, sendEmail } = require('.');

describe('Email Helper', () => {
  let mockSend;

  beforeEach(() => {
    mockSend = getSESClient().send;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendEmail', () => {
    it('should handle error', async () => {
      mockSend.mockRejectedValue(new Error('Email Error'));

      const result = await sendEmail({});

      expect(result).toBeUndefined();
    });

    it('should successfully send an email', async () => {
      const mockResult = { MessageId: '123' };

      mockSend.mockResolvedValue(mockResult);

      const params = {
        toAddresses: ['email@destiny.com'],
        htmlBody: 'No HTML, sorry :)',
        subject: 'Test Subject',
        from: 'email@origin.com',
      };
      const result = await sendEmail(params);

      expect(mockSend).toHaveBeenCalled();
      expect(result).toBe(mockResult);
    });
  });
});
