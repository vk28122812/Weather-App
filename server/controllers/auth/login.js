const router = require('express').Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwt_secret = 'supersecret';

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id }, jwt_secret, { expiresIn: '8h' });
    res.status(200).json({ token, user , message: 'Login successful'});

  } catch (error) {
    console.error('Error in signupController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;