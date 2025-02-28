const router = require('express').Router();
const User = require('../../models/User');

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error in signupController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;