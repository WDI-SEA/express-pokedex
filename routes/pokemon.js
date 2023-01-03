const express = require('express');
const router = express.Router();

const axios = require('axios'); 
// require db
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  // res.send('Render a page of favorites here');
  try {
    const allFavs = await db.pokemon.findAll()
    console.log('faves:', allFavs)
    res.render('favorites', {pokemons: allFavs})

  } catch (err) {
    console.erro(err)
  }
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  // res.send(req.body);

  try {

    const newFav = await db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      }
    })

    res.redirect('/pokemon')

  } catch (err) {
    console.error(err)
  }

});


router.get('/:name', async (req, res) => {
  try {
    // res.send(req.params.name)
    const pokeName = req.params.name
    const apiUrl = `http://pokeapi.co/api/v2/pokemon/${pokeName}/`
    const foundData = await axios.get(apiUrl)
    res.render('show', {pokemon: foundData.data})

  } catch (err) {
    console.error(err)
  }

})


module.exports = router;
