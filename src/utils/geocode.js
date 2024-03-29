const request = require('postman-request');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZXZlcnN0cml2aW4iLCJhIjoiY2syNWZsbnM5MDR6ajNtdGx4OTJoZGgyYyJ9.efHmjoFj__FsNrU07pOdKQ&limit=1';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (body.features.length === 0) {
      callback("Unable to find location, try another search.", undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        lon: body.features[0].center[0],
        loc: body.features[0].place_name
      });
    }
  });
}

module.exports = geocode;