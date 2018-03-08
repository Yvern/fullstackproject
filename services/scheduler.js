var schedule = require('node-schedule');
const mongoose = require('mongoose');
const mailSend = require('./mailSender');
const reminderTemplate = require('./emailTemplates/reminderTemplate');

const Event = mongoose.model('Event');

schedule.scheduleJob('*/1 * * * *', async function(fireDate) {
  console.log(
    'This job should run at: ' + fireDate + ' and ran at: ' + new Date()
  );
  //let event = await Event.findById();

  let events = await Event.find({
    'attendanceReminder.subscribed': true,
    'attendanceReminder.sendDate': { $lt: new Date() }
  });

  if (events) {
    console.log(events);
  }

  //@TODO IMPROVE!!!!!! This is bad and very slow, find a better way to await
  //multiple events being emailed that doesn't fail all if one fails
  events.forEach(async event => {
    await mailSend(event, reminderTemplate);
  });

  //await mailSend(event, reminderTemplate);
  console.log('Emails sent at ' + new Date());
});
