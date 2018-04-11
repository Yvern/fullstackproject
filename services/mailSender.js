const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
sgMail.setApiKey(keys.sendGridKey);

const EMAIL_BODY = 'Email body';
const FROM_EMAIL = 'no-reply@squadsquare.com';

/**
 * Generates personalised emails for each recipient
 */
function generateEmails(
  { _id, title, subject, recipients },
  contentCreator,
  senderName
) {
  return recipients.map(({ email, name }) => {
    let invite = {
      email,
      eventID: _id,
      title,
      body: EMAIL_BODY,
      senderName: senderName
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
  { _id, title, subject, recipients },
  contentCreator,
  { name }
) {
  console.log('User at mailsend: ', name);
  let emails = generateEmails(
    { _id, title, subject, recipients },
    contentCreator,
    name
  );

  const response = sgMail.send(emails);
  return response;
};
