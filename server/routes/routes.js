const router = require('express').Router();
const login = require('../controllers/auth/login');
const signup = require('../controllers/auth/signup');
const weather = require('../controllers/weather/weather_controller');
const feedback = require('../controllers/feedback/feedback.js');

router.use('/login', login);
router.use('/signup', signup);
router.use('/weather', weather);
router.use('/feedback',feedback);

module.exports = router;