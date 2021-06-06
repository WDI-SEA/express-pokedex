const express = require('express');
const router = express.Router();
let db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then((pokemons) => {
    console.log(pokemons.pokemons)
    res.render('pokemon/favorite.ejs', { pokemon: pokemons })
  })
  .catch(err => {
    console.log('oh baby we got an error over here😬')
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to 
  async function favoritePokemon() {
    let [pokemon, created] = await db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      } 
    })
    res.redirect('/pokemon');
  }
  favoritePokemon()
  console.log(req.body)
  
});

// let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`;
              // Use request to call the API
// axios.get(pokemonUrl).then(apiResponse => {
//   let pokemon = apiResponse.data.results;
//   res.render('index', { pokemon: pokemon.slice(0, 151) });// if you want more options of pokemon 
// })

module.exports = router;

// {
//   where: { id: req.params.id },
//   include: [db.pokemon, db.pokedex]
// }
//res.send('Render a page of favorites here');