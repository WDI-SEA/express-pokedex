const router = require('express').Router();
const db = require('../models');
const axios = require('axios');

const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';

router.get('/:name', (req, res) => {
  
  axios.get(pokemonUrl + req.params.name)
  .then((r) => {
    res.send(r.data.species);
  })

// res.send(`a single poke with id`);
})

router.get('/', (req, res) => {
  db.pokemon.findAll()
  .then((poke) => {
    res.render('pokemon/index', {
      poke
    })
  })
  .catch((err) => {
    console.log(`${err}`);
  })  
});

router.post('/', (req, res) => {
  console.log(req.body)
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    },
    defaults: req.body
  })
  .spread((pokemon, wasCreated) => {
    if (wasCreated) {
      // console.log(`Added ${pokemon.name} to Favorites.`);
      res.redirect('/pokemon');
    }
    else {
      // don't insert the record again, but don't berate the user for 
      // really, really, really liking a particular pokemon. 
      // req.flash('error', 'Already favorited.')
      // console.log(`Already exists...`);
      res.redirect('/pokemon');
    }
  })
  .catch(err => {
    console.log(err);
    // will need 'flash' and session state if I want to use this:
    // req.flash('error', 'An unknown error has occured. Please try again.')
    res.redirect('/index');
  })
});



router.delete(('/:name'), (req, res) => {
  let poke = req.params.name;



  res.redirect('/pokemon');
})



module.exports = router;

