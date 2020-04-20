require('dotenv').config();
const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=807';
  // Use request to call the API
  axios.get(pokemonUrl)
  .then( function(apiResponse) {
    //console.log(axios.get(apiResponse.data))
    var pokemon = apiResponse.data.results;
    // console.log(pokemon)
    pokeData = pokemon.map(value => value.url);
    // console.log(pokeData)
    //pokeInfo = [];
    // pokeData.forEach((url) => {
    //   axios.get(url).then(response => {
    //     // do something with response
    //     console.log(response.data)
    //     pokeInfo.push(response.data);
    //   })
    // })
    // axios.get(pokeData)
    // .then((apiTwo) => {
    //   let data = apiTwo.data
      // console.log(data)
      res.render('index', { 
        pokemon: pokemon.slice(0, 251)
        
      });
    // })
  })
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(port, function() {
  console.log('...listening on', port );
});


module.exports = server;
