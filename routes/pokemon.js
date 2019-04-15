var db = require('../models')
var express = require('express');
var router = express.Router();
var request = require('request');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll()
  .then(pokemon => {
    res.render('faves.index', {pokemon})
  })
})

router.get('/:name', (req,res) => {
  var pokemonURL = 'http://pokeapi.co/api/v2/pokemon/'
  request(pokemonURL + req.params.name, (error, response, body) => {
    var pokemon = JSON.parse(body)
    res.render('show', {pokemon})
  })
}) 


router.get('/fave/:id', (req, res) => {
  db.pokemon.findBYpk(req.params.id)
  .then(foundPoke => {
    res.render('faves/show', {favePoke: foundPoke})
  })
  .catch(err=> {
    console.log("Yikes you're bad at stuff", err)
    res.send("Not goof at things, eh?")
  })
})

//POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  db.pokemon.findOrCreate({
    where: {name: req.body.name},
    defaults: req.body
  })
  .then(createdPokemon => {
    console.log("created, createdPokemon.name")
    res.redirect('/pokemon')
  })
  .catch(err=> {
    console.log("err")
    res.send("You Suck")
  })
})

router.put('/fave', (req,res) => {
  db.pokemon.update(req.body, {where: {id: req.body.id}})
  .then(updatedFave=> {
    console.log("updated", updated.nickname)
    res.redirect('/pokemon/fave/'+req.body.id)
  })
})

router.delete('/', (req, res) => {
  db.pokemon.destroy( {
    where: {name :req.body}
      }).then((deletedPokemon) => {
        console.log(deletedPokemon.name, "has been released")
    res.redirect('/pokemon')
  })
  .catch(err=> {
    console.log(err)
    res.send("Can't even release a Pokemon correctly")
  }) 
})

module.exports = router;
