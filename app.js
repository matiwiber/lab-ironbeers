const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// Routes

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render('beers.hbs', beers);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beers => {
      res.render('random-beers.hbs', beers);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
