const request = require('postman-request');

const forecast = (long, lat, callback) => {
  // console.log("long: " + long + " lat: " + lat);
  const url = 'http://api.weatherstack.com/current?access_key=c5c3d92c8df5a1bdae2da28377cdc3c7&query=' + lat + ',' + long + '&units=m'

  request({ url: url, json: true }, (error, { body }) => {
    if(error){
      callback('Unable to connect to weather service.', undefined);
    } else if (body.error) {
      callback('Unable to find that address, look for another.', undefined);
    } else {
      callback(undefined, {
        currTemp: body.current.temperature,
        currFeel: body.current.feelslike,
        precip: body.current.precip,
        weatherDesc: body.current.weather_descriptions[0]
      });
    }
  });
}

module.exports = forecast
