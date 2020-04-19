var express = require('express');
const axios = require('axios'); 
var router = express.Router();
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(faves => {res.render('pokemon/index', {faves})})
  .catch(err => {
    res.send("Yo, this biz is broke")
    console.log(err)
  })
});
// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
    name: req.body.name,
    nickName: req.body.nickName,
    level: req.body.level,
    maxHp: req.body.maxHp,
    currentHp: req.body.maxHp
  })
  .then(res.redirect('/pokemon'))
  .catch(err => {
    res.send("Yo, this biz is broke")
    console.log(err)
  })
});
// GET the form for adding pokemon to your team, or redirect the player
router.get('/new/:name', (req,res) => {
  db.pokemon.findAll()
  .then(team => {
    if(team.length >= 6) {res.render('pokemon/fullTeam')}
    else {res.render('pokemon/new', {name:req.params.name})}
  })
  .catch(err => {
    res.send("Yo, this biz is broke")
    console.log(err)
  })
})
// GET a specific pokemon
router.get('/:name', (req,res) => {
  var name, id, description, habitat, evoChain
  // https://pokeapi.co/api/v2/pokemon/[POKEMON NAME]
  axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`).then( function(pokeData) {
    // Data
    var pokedex = pokeData.data;
    name = pokedex.name
    id = pokedex.id
    // Next Search
    axios.get(pokedex.species.url).then(speciesData => {
      // Data
      var species = speciesData.data;
      description = species.flavor_text_entries[1].flavor_text
      habitat = species.habitat.name
      // Next Search
      axios.get(species.evolution_chain.url).then(evolutionData => {
        var evolution = evolutionData.data.chain
        console.log(evolution)
        res.render('pokemon/show', {
          name: name,
          id: id,
          description: description,
          habitat: habitat,
          evolution: evolution,
        })
      })
    })
  })
})
// Remove a pokemon from your team
router.delete('/:idx', (req,res) => {
  console.log("Ready to delete...")
  db.pokemon.destroy({where: {id:req.params.idx}})
  .then(res.redirect('/pokemon'))
  .catch(err => {
    res.send("Yo, this biz is broke")
    console.log(err)
  })
})

module.exports = router;
