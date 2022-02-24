const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const db = require('./models');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

// this is to traverse pages
app.get('/', async (req,res) => {
  let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/?offset=${req.query.offset}&limit=${req.query.limit}`;
  if(req.query.offset == '0') {
    res.redirect('/')
  }
  try {
    const response = await axios.get(pokemonUrl)
    let pokemon = response.data;      
    res.render('index', { pokemon: pokemon})
  } catch (err) {
    res.send(`An error occured. Error : ${err}`)
  } 
})

// GET / - main index of site
app.get('/', (req, res) => {  
  let pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data;    
    // res.send(pokemon)    
    console.log(pokemon.url)
    res.render('index', { pokemon: pokemon});
  })
});

// GET for poke details
app.get('/:name', async (req,res) => {
  let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${req.params.name}`
  try {    
    const response = await axios.get(pokemonUrl)    
    res.render('show',{pokemon: req.params.name,
      pokeData: response.data})    
  } catch (err) {
    res.send(`An error occured. Error details : ${err} name: ${req.params.name} url: ${pokemonUrl}`)
  }

})



app.listen(port, () => {
  console.log('...listening on', port );
});