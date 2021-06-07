const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
let rowdy = require('rowdy-logger')
const rowdyResults = rowdy.begin(express())
let db = require('./models')
let methodOverride = require('method-override')

const app = express();
const port = process.env.PORT || 3000;

rowdy.begin(app)

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'))
// method override so we can put and delete
app.use(methodOverride('_method'))




// GET / - main index of site
app.get('/', (req, res) => {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151';
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })



 
  // trying to add pics to favorites pg
 



  
});





    
    


// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));






rowdyResults.print()

app.listen(port, () => {
  console.log('...listening on', port  );
});