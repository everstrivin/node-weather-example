const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicFolder = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// Set up static directory to serve
app.use(express.static(publicFolder));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'John Higgin'
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: "John"
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    msg: "This is a message, but I wouldn't want this to be too long.",
    name: 'Billy Bobby'
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must include an address',
    });
  } else {
    geocode(req.query.address, (error, {lon, lat, loc} = {}) => {
      if(error) {
        return res.send({ error });
      };
    
      forecast(lon, lat, (error, {weatherDesc, currTemp, currFeel, precip}) => {
        if(error) {
          return res.send({ 
            error
          });
        }
        res.send(
          {
            forecast: 'It is currently ' + weatherDesc + ' and ' + currTemp + '° but feels like ' + currFeel + '° and there is ' + precip * 100 + '% chance of rain.',
            location: loc,
            address: req.query.address
          }
        );
      });
    });
  }
  
});

app.get('/products', (req, res) => {
  //Query strings! use in browser with 3000/products?search=''
  if(!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    });
  }
  
  console.log(req.query);
  res.send({
    products: []
  });
})

//Match anything else in the help folder
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: "Help Error",
    errormsg: "Help article not found",
    name: 'John'
  });
});

//Match anything else anywhere
app.get('*', (req, res) => {
  res.render('404', {
    title: "General Error",
    errormsg: "My 404 page",
    name: 'Johnny'
  });
});


//get the server up and running
//port 3000 is a common development port
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});