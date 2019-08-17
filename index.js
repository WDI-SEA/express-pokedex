require('dotenv').config();

const express = require('express');
const axios = require('axios'); 

const layouts = require('express-ejs-layouts');
const app = express();

const port = process.env.PORT || 3000;
const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';

app.use('/', express.static('static'));
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: false
}));

app.use(layouts);

app.get('/', (req, res) => {

  // First get the count of max, then get them all
  // should stuff in memcache/redis for better perf.
  axios.get(`${pokemonUrl}?limit=1`)
  .then( (r1) => {
    let maxLimit = r1.data.count;
    axios.get(`${pokemonUrl}?limit=${maxLimit}`)
    .then((r2) => {
      let pokemon = r2.data.results;
      res.render('index', {
        pokemon
      });
    })
  })
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./controllers/pokemon'));

let server = app.listen(port, () => {
  console.log('Express is listening on', port );
});

module.exports = server;
