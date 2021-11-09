const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll()
  .then(poke => {
    // TODO: Get all records from the DB and render to view
  res.render('indexFaves', {results: poke});
  })
  .catch(error => {
    console.error
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body))
  console.log('this is data', data)
  db.pokemon.create({
    name: data.name
  })
  .then(poke => {
    console.log('Created: ', poke.name)
    // TODO: Get form data and add a new record to DB
    res.redirect(`/pokemon/`)
  })
  .catch(error => {
    console.log(error)
  })
});


//SHOW
router.get('/:name', function (req, res) {
  // we used this console log, to check out our request object
  // console.log('this is req.query', req.query)
  let name = req.params.name
  // console.log('this should be the movie title', imdbId)
  // now we can use the movieTitle, to build the request url, and make the call with axios
  axios.get(`http://pokeapi.co/api/v2/pokemon/${name}/`)
      .then(apiRes => {
          console.log('this is apiRes.data', apiRes.data)
          let name = apiRes.data.name
          let height = apiRes.data.height
          let weight = apiRes.data.weight
          let abilities = apiRes.data.abilities
          let id = apiRes.data.id
          let moves = apiRes.data.moves
          let image = apiRes.data.sprites.front_default
          
          // res.render results to results.ejs, with our selected data sent as an object
          res.render('detail', { name: name, height: height, weight: weight, abilities: abilities, id: id, moves: moves, image: image})
      })
      .catch(err => {
          console.log(err)
      })
})


module.exports = router;
