const EmailHelper = require('../../../libs/email-helper');
const { sendPassword } = require('./send-password');

jest.mock('../../../libs/email-helper');

describe('sendPassword', () => {
  let sendEmailMock;

  beforeEach(() => {
    sendEmailMock = jest.spyOn(EmailHelper, 'sendEmail');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return undefined if there is an error', async () => {
    sendEmailMock.mockImplementation(() => undefined);
    const sent = await sendPassword('test@email.com', '123456');
    expect(sendEmailMock).toHaveBeenCalled();
    expect(sent).toBeUndefined();
  });

  it('should not return undefined', async () => {
    sendEmailMock.mockImplementation(() => ({}));
    const sent = await sendPassword('test@email.com', '123456');
    expect(sendEmailMock).toHaveBeenCalled();
    expect(sent).not.toBeUndefined();
  });
});
