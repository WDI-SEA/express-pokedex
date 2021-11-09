const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios')


// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
    .then(faves => {
      res.render('indexFaves',{results: faves})
    })
    .catch(error => {
      console.log(error)
    })
  // res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  const data = JSON.parse(JSON.stringify(req.body))
  console.log('this is data', data)
  db.pokemon.create({
    name: data.name
  })
  .then(newFave => {
    console.log('db instance created: \n', newFave)
    res.redirect('/pokemon')
  })
  .catch(error => {
    console.log(error)
  })
  // res.send(req.body);
});

router.get('/:name', function(req,res) {
  let pokemonContent = req.params.name

  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonContent}/`)
    .then(apiRes => {
      let pokemonName = apiRes.data.name
      let pokemonAbilities =  apiRes.data.abilities[0].ability.name
      let pokemonBaseStat = apiRes.data.stats[0].base_stat
      let pokemonTypes = apiRes.data.types[0].type.name
      let pokemonImg = apiRes.data.sprites.other.dream_world.front_default
      let pokemonMove = apiRes.data.moves[0].move.name

      res.render('faveDetail', { pokemonName, pokemonAbilities, pokemonBaseStat, pokemonTypes, pokemonImg, pokemonMove})
    })
    .catch(error =>  {
      console.log(error)
    })
})

//we'er going to add a delete, that allow us to remove a fav
router.delete('/:name', (req, res) => {
  // console.log('this is the id\n', req.params.id)
  db.pokemon.destroy ({
      where: {name: req.params.name}
  })
  .then(deletedItem => {
      // destroy returns 1 if something is deleted and 0 if nothing happens
      // console.log('You deleted:  ', deletedItem)
      res.redirect('/pokemon')
  })
  .catch(error => {
      console.log(error)
  })
})




module.exports = router;
