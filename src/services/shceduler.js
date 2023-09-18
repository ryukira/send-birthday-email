const schedule = require('node-schedule');
const moment = require('moment-timezone');
const User = require('../models/user');
const { sendEmail } = require('./emailService');

// Define an object to store scheduled jobs
const scheduledJobs = {};

function scheduleBirthdayMessages() {
  // ... (previous code for scheduling messages)
}

// Function to update a scheduled birthday message based on user details
async function updateScheduledBirthdayMessage(userId, updatedUser) {
  try {
    if (scheduledJobs[userId]) {
      // Cancel the existing scheduled job
      scheduledJobs[userId].cancel();

      // Get the updated user's details
      const user = await User.getById(userId);

      // Schedule a new birthday message with the updated details
      const userBirthday = moment(user.birthday).tz(user.location);
      const rule = new schedule.RecurrenceRule();
      rule.year = userBirthday.year();
      rule.month = userBirthday.month();
      rule.date = userBirthday.date();
      rule.hour = 9;
      rule.minute = 0;
      rule.second = 0;

      scheduledJobs[userId] = schedule.scheduleJob(rule, async () => {
        const fullName = `${user.first_name} ${user.last_name}`;
        const email = user.email;

        // Send the birthday message
        await sendEmail(email, `Hey, ${fullName} it's your birthday`);
      });
    }
  } catch (error) {
    console.error('Error updating scheduled birthday message:', error.message);
  }
}

module.exports = {
  scheduleBirthdayMessages,
  updateScheduledBirthdayMessage,
};
