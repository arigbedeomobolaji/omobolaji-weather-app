//jshint esversion: 9

const axios = require("axios").default;

const geocoding = async (location, cb) => {

  try {
  const options = {
    method: "GET",
    url: "https://geocoder.ls.hereapi.com/6.2/geocode.json",
    params: {
      apiKey: process.env.GEOCODING_API_KEY,
      searchtext: location,
      limit: "1",
    }
  };
  
  
    const response = await axios.request(options);
    
    const { DisplayPosition, Address } = await response.data.Response.View[0].Result[0].Location;

    const data = {
      lat: DisplayPosition.Latitude,
      lon: DisplayPosition.Longitude,
      address: Address.Label
    };

    cb(data, undefined);

  } catch (e) {
    cb(undefined, {message: "Please provide a valid address or check internet connection",error: e});
  }
};



module.exports = geocoding;