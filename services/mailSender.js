const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
sgMail.setApiKey(keys.sendGridKey);

const EMAIL_BODY = 'Email body';
const FROM_EMAIL = 'no-reply@squadsquare.com';

/**
 * Generates personalised emails for each recipient
 * Takes in an event object which is destructured to extract information
 * about the event.
 */
function generateEmails(
  { _id, title, subject, recipients, minimumParticipants, eventDate },
  contentCreator,
  senderName
) {
  let confirmationText = '';
  let invitations = recipients.length;
  let confirmations = 0;
  //calculate confirmations
  recipients.forEach(recipient => {
    if (recipient.attending) {
      confirmations++;
    }
  });
  //set confirmation text for emails
  if (confirmations >= minimumParticipants) {
    confirmationText = 'The event has been confirmed for ' + eventDate + '!';
  } else {
    confirmationText = 'Unfortunately the event has been cancelled!';
  }

  return recipients.map(({ email, name }) => {
    let invite = {
      email,
      eventID: _id,
      title,
      body: EMAIL_BODY,
      senderName: senderName,
      text: confirmationText,
      confirmations,
      invitations,
      date: eventDate
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
 * First generates emails based on the given event and content template,
 * then tries to sent the emails.
 */
module.exports = async function send(
  { _id, title, subject, recipients, minimumParticipants, eventDate },
  contentCreator,
  { name }
) {
  console.log('User at mailsend: ', name);
  let emails = generateEmails(
    { _id, title, subject, recipients, minimumParticipants, eventDate },
    contentCreator,
    name
  );

  try {
    const response = sgMail.send(emails);
    return response;
  } catch (err) {
    console.log('An error occured while sending emails: ' + err);
    return null;
  }
};
