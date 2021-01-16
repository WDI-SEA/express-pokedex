const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const db = require('./models');
const { response } = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', function(req, res) {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data.results;
    console.log(apiResponse.data.results)
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })
});

app.get('/pokemon', (req, res) =>{
  db.Pokemon.findAll().then(pokemon =>{
    res.render('Pokemon/index', {pokemon})
  })
})

app.post('/pokemon', (req, res) =>{
  console.log(req.body)
  db.Pokemon.create({
    name: req.body.name
  }).then(createdFav =>{
    res.redirect('/pokemon')
  })
})

// app.get('/pokemon/:id', (req, res) =>{
//   axios.get(`https://pokeapi.co/api/v2/${req.params.id}`)
//   }).then(response =>{
//     console.log(response.data)
//     res.render('details')
//   }).catch(error => {
//     console.log('Error! Please reload the page.')
//     res.sendStatus(500)
//   })


// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

app.listen(port, () => {
  console.log('...listening on', port );
});