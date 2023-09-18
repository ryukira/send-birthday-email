const express = require('express');
const router = express.Router();
const moment = require('moment-timezone'); // Use moment-timezone for handling timezones
const User = require('../models/user'); // Import your User model
const { sendBirthdayMessage } = require('../services/emailService'); // Import your email service function

// Schedule birthday messages for all users
router.post('/schedule', async (req, res) => {
  try {
    const currentTime = moment(); // Get the current time
    const users = await User.getAll(); // Get all users from the database

    for (const user of users) {
      const userBirthday = moment(user.birthday).tz(user.location); // Adjust the birthday to the user's timezone

      // Check if it's the user's birthday today at 9 am
      if (
        userBirthday.format('MM-DD') === currentTime.format('MM-DD') &&
        currentTime.hour() === 9 &&
        currentTime.minute() === 0
      ) {
        const fullName = `${user.first_name} ${user.last_name}`;

        // Send the birthday message
        await sendBirthdayMessage(user.email, `Hey, ${fullName} it's your birthday`);
      }
    }

    res.status(200).json({ message: 'Birthday messages scheduled successfully' });
  } catch (error) {
    console.error('Error scheduling birthday messages:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
