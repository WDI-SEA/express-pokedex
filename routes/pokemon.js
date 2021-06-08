const express = require('express');
const router = express.Router();
let db = require("../models")
const axios = require('axios')

router.get('/:id', (req, res) => {
  // get the name of the pokemon associated with this id from our db
    // get name from req.query
    let name = req.query.name
    
  // get extra information for pokemon at id
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((apiRes) => {

        // info we want to get: pokeAPI id, pokeAPI char image, types
        let imgSrc = apiRes.data.sprites.front_default
        let pokeId = apiRes.data.id
        let types = apiRes.data.types[0].type.name

        res.render('pokemon/show', {src: imgSrc, id: pokeId, type: types})
      })
      .catch(err => console.log(err))
    
  // render a page with pokemon details passed back from our APIcall
})

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // Get all records from the DB of pokemons
  db.Pokemon.findAll()
    .then(result => {
      // render pokemon/index.ejs with returned pokemon data
      res.render('pokemon/index', {pokemons: result})
    })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // Get form data
  let name = req.body.name

  // add a new record to DB
  db.Pokemon.findOrCreate({
    where: {
      name: name
  }})
    .then((data) => {
        // redirect back to favorites page
        res.redirect('/pokemon')
    })
    .catch((err) => {
      console.log(`uh oh we found an err: ${err}`)
    })
});

module.exports = router;