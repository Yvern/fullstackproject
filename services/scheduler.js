var schedule = require('node-schedule');
const mongoose = require('mongoose');
const mailSend = require('./mailSender');
const reminderTemplate = require('./emailTemplates/reminderTemplate');
const organiserReminderTemplate = require('./emailTemplates/organiserReminderTemplate');
const confirmationTemplate = require('./emailTemplates/confirmationReminderTemplate');

const Event = mongoose.model('Event');
const User = mongoose.model('User');

//Attendance reminder scheduler
//Checks the database hourly for events for which an email needs to be sent
schedule.scheduleJob('*/1 * * * *', async function(fireDate) {
  console.log(
    'Reminder Email Sending. Scheduled for: ' +
      fireDate +
      ' and running at: ' +
      new Date()
  );

  let events = await Event.find({
    'attendanceReminder.subscribed': true,
    'attendanceReminder.sendDate': { $lt: new Date() },
    'attendanceReminder.sent': false
  });

  if (events) {
    //Return events with list of recipients who haven't responded yet
    let mappedEvents = events.map(event => {
      let reminderRecipients = event.recipients.filter(recip => {
        return !recip.responded;
      });
      let eventCopy = JSON.parse(JSON.stringify(event));
      eventCopy.recipients = reminderRecipients;
      return eventCopy;
    });

    //@TODO Consider options to improve for larger amounts of data
    for (let i = 0; i < events.length; i++) {
      try {
        //create object to send mail to organiser
        const user = await User.findById(events[i]._user);
        organiserEvent = JSON.parse(JSON.stringify(events[i]));
        organiserEvent.subject =
          'Reminder For Your Event:' + organiserEvent.title;
        organiserEvent.body = 'Your event on ' + organiserEvent.eventDate + '.';
        organiserEvent.recipients = [{ email: user.email, name: user.name }];

        //Add subject & body information for recipient emailTemplates
        mappedEvents[i].subject =
          'Reminder: Invitation for ' + mappedEvents[i].title;
        mappedEvents[i].body =
          "We'd like to remind you to tell " +
          user.name +
          ' if you can make it to their event ' +
          mappedEvents[i].title +
          '!';

        //send emails and save updated information
        await mailSend(organiserEvent, organiserReminderTemplate, user);
        await mailSend(mappedEvents[i], reminderTemplate, user);

        events[i].attendanceReminder.sent = true;
        await events[i].save();

        console.log('Reminder emails sent at ' + new Date());
      } catch (err) {
        console.log(err);
      }
    }
  }
});

//Confirmation reminder scheduler
//Checks the database hourly for events for which an email needs to be sent
schedule.scheduleJob('*/1 * * * *', async function(fireDate) {
  console.log(
    'Confirmation Email Sending. Scheduled for: ' +
      fireDate +
      ' and running at: ' +
      new Date()
  );

  let events = await Event.find({
    'confirmationReminder.subscribed': true,
    'confirmationReminder.sendDate': { $lt: new Date() },
    'confirmationReminder.sent': false
  });

  if (events) {
    //Return events with list of recipients who responded with 'yes' to the event
    let mappedEvents = events.map(event => {
      let reminderRecipients = event.recipients.filter(recip => {
        return recip.attending;
      });
      let eventCopy = JSON.parse(JSON.stringify(event));
      eventCopy.recipients = reminderRecipients;
      return eventCopy;
    });

    //@TODO Consider options to improve for larger amounts of data
    for (let i = 0; i < events.length; i++) {
      //check if event is confirmed or cancelled based on minimumParticipants
      let confirmed = !(
        mappedEvents.minimumParticipants > mappedEvents[i].recipients.length
      );

      try {
        //create object to send mail to organiser
        const user = await User.findById(events[i]._user);

        organiserEvent = JSON.parse(JSON.stringify(events[i]));
        organiserEvent.subject = 'Update on Your Event:' + organiserEvent.title;
        organiserEvent.body = 'Your event on ' + organiserEvent.eventDate + '.';
        organiserEvent.recipients = [{ email: user.email, name: user.name }];

        //Add subject & body information for recipient emailTemplates
        mappedEvents[i].subject = confirmed
          ? 'You have an event: ' + mappedEvents[i].title
          : 'The event ' + mappedEvents[i].title + ' has been cancelled.';
        mappedEvents[i].body = confirmed
          ? 'The event you responded to, ' +
            mappedEvents[i].title +
            ' , will start on ' +
            mappedEvents[i].date
          : "The event '" + mappedEvents[i].title + "' has been cancelled.";

        //send emails and save updated information
        await mailSend(organiserEvent, confirmationTemplate, user);
        await mailSend(mappedEvents[i], confirmationTemplate, user);

        events[i].confirmationReminder.sent = true;
        await events[i].save();
        console.log('Confirmation emails sent at ' + new Date());
      } catch (err) {
        console.log(err);
      }
    }
  }
});
