const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  // res.send('Render a page of favorites here');
  db.pokemon.findAll()
  .then(pokes => {
    res.render('favorites.ejs', {results: pokes})
  })
  .catch(error => {
    console.error
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  const data = JSON.parse(JSON.stringify(req.body))
  console.log('this is data', data)
  db.pokemon.create({
    name: data.name
  })
  .then(addedPoke => {
    console.log('new poke:', addedPoke)
    res.redirect('/pokemon')
  })
  .catch(error => {
    console.error
  })
  // res.send(req.body);
});

// GET route to display details about a particular pokemon
router.get('/:name', (req, res) => {
  let pokeName = req.params.name
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`)
  .then(apiRes => {
    // console.log('this is the result data\n', apiRes)
    // individual data elements to pull from API for display
    let name = apiRes.data.name
    let spriteUrl = apiRes.data.sprites.front_default
    let weight = apiRes.data.weight / 10 // weight is kg * 10, dividing by 10 to return to kg
    let typeArr = apiRes.data.types // this is an array that will need to be looped in the display
    let baseHp = apiRes.data.stats[0].base_stat
    res.render('show.ejs', {name, spriteUrl, weight, typeArr, baseHp})
  })
})

module.exports = router;
