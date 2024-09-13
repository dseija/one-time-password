const { sendEmail } = require('../../../libs/email-helper');

module.exports.sendPassword = async (email, password) => {
  const htmlBody = `
    <!DOCTYPE html>
    <html>
      <body>
        <h1>${process.env.EMAIL_SUBJECT}</h1>
        <p>Use this password to complete your signin at ${process.env.APP_NAME}:</p>
        <h2>${password}</h2>
      </body>
    </html>
  `;

  const result = await sendEmail({
    toAddresses: [email],
    from: `${process.env.APP_NAME} <${process.env.EMAIL_FROM}>`,
    subject: process.env.EMAIL_SUBJECT,
    htmlBody,
  });

  return result;
};
