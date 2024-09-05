const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const logger = require('../logger');

let sesClient;

const getSESClient = () => {
  if (!sesClient) {
    sesClient = new SESClient({});
  }
  return sesClient;
};

const getEmailData = (params) => {
  return {
    Destination: {
      CcAddresses: params.ccAddresses || [],
      ToAddresses: params.toAddresses,
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: params.htmlBody,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: params.subject,
      },
    },
    Source: params.from,
  };
};

const sendEmail = async (params) => {
  let result;
  try {
    const command = new SendEmailCommand(getEmailData(params));
    result = await getSESClient().send(command);
  } catch (e) {
    logger.log(e.stack, 'error');
  }

  return result;
};

module.exports = { getSESClient, sendEmail };
