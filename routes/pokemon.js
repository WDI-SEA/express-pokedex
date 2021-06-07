const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(result => {

  
  //render pokemon index.ejs with returned pkemon data
  
  res.render('pokemon/index', {pokemons: result});
})
});



// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  let name = req.body.name
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: name
    }})
  .then((data) => {
    //redirect to favorites page
    res.redirect('/pokemon')
  })
  .catch((err) => {
    console.log('errorrr ')
  })
  
});

router.get('/:id', (req, res) => {
  //get name of pokemon associated with id from db
  let name = req.query.name

  //get info for pokemon:id
  axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((apiRes) => {
    let imgSrc = apiRes.data.sprites.front_default
    let pokeId = apiRes.data.id
    let types = apiRes.data.types[0].type.name
    

    res.render('pokemon/show', {src: imgSrc, id: pokeId, type: types})
  })

  // render page with pokemon details
})

module.exports = router;
