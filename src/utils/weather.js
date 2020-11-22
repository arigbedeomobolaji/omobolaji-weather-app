//jshint esversion: 9

const axios = require("axios").default;

const weatherForecast = async ({lat, lon, address}, cb) => {

  var options = {
   method: 'GET',
   url: 'https://api.climacell.co/v3/weather/forecast/hourly',
   params:{
    apikey: process.env.WEATHER_API_KEY,
    lat,
    lon,
    fields: 'temp,feels_like,weather_code,precipitation_probability',
    unit_system: 'si'
   }

  };
 
  try {
   const response = await axios.request(options);
   const data = await response.data[0];
   
   const { temp, precipitation_probability, feels_like, weather_code } = data;

   const weatherDesc = `In ${address}, there is ${precipitation_probability.value}% chance of raining and the weather is ${weather_code.value} and the temperature is ${temp.value}${temp.units}`;
    const weatherData = {
      weatherDesc,
      data
    };
   cb(weatherData, undefined);
  } catch (e) {
   cb(undefined, `Please check internet connnection or connect Weather forecast provider => ${e}`);
 }
 
};

module.exports = weatherForecast;