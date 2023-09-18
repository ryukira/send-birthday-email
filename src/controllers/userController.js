const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { updateScheduledBirthdayMessage } = require('../services/scheduler'); // Import the function to update scheduled messages

// Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a user's details
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.update(id, req.body);

    // After updating user details, update the scheduled birthday message as well
    await updateScheduledBirthdayMessage(id, req.body);

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
