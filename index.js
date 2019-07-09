require('dotenv').config();// use .env file, need to install and touch .env 
const express = require('express'); // for express framework, need npm i express and call app=express()
const axios = require('axios'); // node module, for retrieving API , need install b4 use
const ejsLayouts = require('express-ejs-layouts'); // for layout, need install b4 use
const app = express(); // calling express to use
const port = process.env.PORT || 3000; // setting port 
const methodOverride =require('method-override'); // for method override , need install 


app.use(require('morgan')('dev'));
app.set('view engine', 'ejs'); // to use ejs files
app.use(express.urlencoded({ extended: false })); //middle ware, to recognize the incoming Request Object as strings or arrays
app.use(express.static(__dirname + '/public')); // to use public folder, like css , js , img ..etc..
app.use(ejsLayouts); // use ejsLayouts
app.use(methodOverride('_method')); //use methodOverride

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    var pokeUrl = pokemon.url;
    // var pokemonImg;
    // pokemon.forEach(function(singlePoke){
    //   axios.get(pokeUrl).then(function(apiResponse){
    //     pokemonImg = apiResponse.data.results;
    //   })
    // })
    res.render('index', {pokemon});
  })
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));



var server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;
