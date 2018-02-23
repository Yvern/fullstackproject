const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
sgMail.setApiKey(keys.sendGridKey);

class RecipientMailer {
  constructor({ eventID, subject, recipients }, contentCreator) {
    this.from_email = 'no-reply@squadsquare.com';
    this.subject = subject;
    this.recipients = recipients;
    this.body = 'message';
    this.emails = [
      {
        to: 'rosehissink@gmail.com',
        from: 'no-reply@squadsquare.com',
        subject: 'Hello recipient',
        text: 'Some text here',
        html: '<p>Some other text in html</p>'
      },
      {
        to: 'roos_hissink@live.nl',
        from: 'no-reply@squadsquare.com',
        subject: 'Hello other recipient',
        text: 'Special message for you',
        html: '<p>Special message for you</p>'
      }
    ];
    this.newEmails = this.generateEmails();
  }

  generateEmails() {
    return this.recipients.map(({ email, name }) => {
      invite = {
        email,
        eventID: this.eventID,
        body: this.body
      };
      return {
        to: email,
        from: this.from_email,
        subject: this.subject,
        text: 'TEXT',
        html: this.contentCreator(invite)
      };
    });
  }

  async send() {
    console.log(this.newEmails);
    await sgMail.send(this.emails);
  }
}

module.exports = RecipientMailer;
