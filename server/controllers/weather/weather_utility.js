const axios = require('axios');
require('dotenv').config();
exports.geoCode = async (address) => {
    // console.log("here fetching"+address+" latitude and longtitude");
    try {
        const token = process.env.token;
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/` + encodeURIComponent(address) + `.json?access_token=${token}&limit=1`;
        const response = await axios.get(url);       
        if (response.data.features.length === 0) {
            throw new Error('Unable to find location, Try another search!');
        }
        
        return {
            latitude: response.data.features[0].center[1],
            longitude: response.data.features[0].center[0],
            location: response.data.features[0].place_name
        };
    } catch (error) {
        throw new Error('Unable to connect to location services!');
    }
}

exports.forecast = async (latitude, longitude) => {
    try {
        // console.log(latitude,longitude);
        const apiKey = process.env.apiKey;
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;
        const response = await axios.get(url);
        // console.log(response);
        if (response.data.error) {
            throw new Error('Unable to find location');
        }
        return response.data;
        
    } catch (error) {
        throw new Error('Unable to connect to weather service!');
    }
}