const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
sgMail.setApiKey(keys.sendGridKey);

const EMAIL_BODY = 'Email body';
const FROM_EMAIL = 'no-reply@squadsquare.com';

/**
 * Generates personalised emails for each recipient
 */
function generateEmails({ eventID, subject, recipients }, contentCreator) {
  return recipients.map(({ email, name }) => {
    let invite = {
      email,
      eventID: eventID,
      body: EMAIL_BODY
    };
    return {
      to: email,
      from: FROM_EMAIL,
      subject: subject,
      text: 'An invitation',
      html: contentCreator(invite)
    };
  });
}

/**
 * Handles the process of sending emails using SENDGRID
 */
module.exports = async function send(
  { eventID, subject, recipients },
  contentCreator
) {
  let emails = generateEmails({ eventID, subject, recipients }, contentCreator);

  const response = sgMail.send(emails);
  return response;
};
