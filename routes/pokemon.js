var express = require('express');
var router = express.Router();
let db = require('../models')
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();


// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll().then(favorite => {
    res.render('pokemon/index', {
      pokemon : favorite
    })
  }).catch(err => {
    console.log(err)
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  // db.pokemon.create({
  //     name: req.body.name
  // }).then(name => {
  //     console.log('ooooof');
  //     res.redirect('/')
  // }).catch(err => {
  //   console.log(err)
  // })
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(([pokemon, created]) => {
        console.log(`${pokemon.name} was ${created ? 'created' : 'found'}!`)
        res.redirect('/')
  }).catch(err => {
    console.log(err)
  })
});

router.get('/:id/:name', (req, res) => {
  let poke = req.params.id
  console.log(req.params.name)
  poke++
  console.log(poke)
  db.pokemon.findOne({
        where: {
            id : poke
        }
    }).then(foundPoke => {
      let location = `https://pokeapi.co/api/v2/pokemon/${foundPoke.name}`
      console.log(location)

      P.getPokemonByName(`${foundPoke.name}`) // with Promise
      .then(function(response) {
        res.render('pokemon/show', 
          response
        );
      })
      .catch(function(error) {
        console.log('There was an ERROR: ', error);
      });




    }).catch(err => {
      console.log(err)
    })
  

});

module.exports = router;



