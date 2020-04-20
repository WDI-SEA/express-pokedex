var express = require('express');
var router = express.Router();
var db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // Get all records from the DB and render to view
  db.pokemon.findAll()
  .then((poke) => {
    res.render('pokemon/index', { poke } );
  })
  .catch((err) => {
    console.log('ERROR', err)
    res.render('error')
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // Get form data and add a new record to DB
  db.pokemon.create({
    name: req.body.name
  })
  .then(() => {
    res.redirect('/pokemon')
  })
  .catch((err) => {
    console.log('ERROR', err)
    res.render('error')
  })
});

router.get('/:id', (req, res) => {
  db.pokemon.findOne({
      where: { id: req.params.id },
    })
    .then((poke) => {
      let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
      axios.get((pokemonUrl)+poke.name)
      .then((apiResponse) => {
        let data = apiResponse.data
        let pokeId = data.id
        let pokeMoves = data.moves
        console.log(pokeMoves)
        axios.get(('https://pokeapi.co/api/v2/pokemon-species/')+pokeId)
        .then((apiTwo) => {
          let species = apiTwo.data
          //console.log(apiTwo)
          //console.log('This is the pokemon id', pokeId)
          moveData = [];
          pokeMoves.forEach((dataMove) => {
            //console.log(dataMove.move.url)
            axios.get(dataMove.move.url).then(response => {
              console.log(response.data)
              moveData.push(response.data)
            })
          })
          // axios.get(('https://pokeapi.co/api/v2/move/')+pokeMoves)
          // .then((apiThree) => {
          //   let moves = apiThree.data
          //   console.log(moves)
          // })
          res.render('pokemon/show', {poke, data, species, moveData})
        })
      })
    })
    .catch((err) => {
      console.log(err)
      res.render('error')
    })
})



module.exports = router;
