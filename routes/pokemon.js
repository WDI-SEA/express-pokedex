var express = require('express');
var db = require('../models');
const pokemon = require('../models/pokemon');
const axios = require('axios'); 
var router = express.Router();

function ahDang(error){ console.log(`ah dang\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n${error}`); }

router.get('/:id', (req, res) => {
  let pokemonId = req.query.id
  let pokemonName;
  console.log('id guy', pokemonId)
  db.pokemon.findOne({
    where:{
      id: pokemonId
    }
  }).then( pokemon =>{
    pokemonName = pokemon.name;
    var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    // Use request to call the API
    axios.get(pokemonUrl).then( function(apiResponse) {
      res.send(apiResponse.data);
    })


  })

  //res.render('show')
});

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  let favPokemon = [];
  db.pokemon.findAll({}).then(pokemons =>{
    pokemons.forEach(pokemon =>{
      favPokemon.push(pokemon.dataValues);
    })
    favPokemon.forEach(pokemon => {
      console.log('dese guys', pokemon);
    })
    res.render('pokemon.ejs', { pokemon: favPokemon });
  }).catch( error => ahDang(error))
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  let favPokemon = req.body.name;

  db.pokemon.findOrCreate({
    where: { name: favPokemon } 
      // defaults: { name: favPokemon }  
  }).then(([pokemon, created]) =>{
    console.log('yay made', pokemon, created)
    res.redirect('/pokemon');
  }).catch( error => ahDang(error))

  // favPokemon = [];
  // db.pokemon.findAll({}).then(pokemons =>{
  //   pokemons.forEach(pokemon =>{
  //     favPokemon.push(pokemon.dataValues);
  //   })
  //   favPokemon.forEach(pokemon => {
  //     console.log('dese guys', pokemon);
  //   })
  //   res.render('pokemon.ejs', { pokemon: favPokemon });
  // }).catch( error => ahDang(error))
  
});

module.exports = router;

function propertiesToArray(obj) {
  const isObject = val =>
      typeof val === 'object' && !Array.isArray(val);

  const addDelimiter = (a, b) =>
      a ? `${a}.${b}` : b;

  const paths = (obj = {}, head = '') => {
      return Object.entries(obj)
          .reduce((product, [key, value]) => 
              {
                  let fullPath = addDelimiter(head, key)
                  return isObject(value) ?
                      product.concat(paths(value, fullPath))
                  : product.concat(fullPath)
              }, []);
  }

  return paths(obj);
}
