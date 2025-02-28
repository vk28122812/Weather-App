const express = require('express');
const router = express.Router();
const { geoCode, forecast } = require('./weather_utility');
const Search = require('../../models/Search');
const jwt = require('jsonwebtoken');

const jwt_secret = 'supersecret';

router.get('/', async (req, res) => {
    const address = req.query.address;
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        let userId;
        jwt.verify(token, jwt_secret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            userId = decoded.userId;
        });

        const search = new Search({userId: userId, location: address});
        await search.save();

        const location = await geoCode(address);
        const weather = await forecast(location.latitude, location.longitude);
        res.json({ location, weather });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/searches', async (req, res) => {  
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        let userId;
        jwt.verify(token, jwt_secret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            userId = decoded.userId;
        });

        const searches = await Search.find({ userId: userId });
        res.status(200).json(searches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;
