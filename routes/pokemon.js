const express = require('express');
const router = express.Router();
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  try {
    // find all of the pokemon that have been favorited
    const pokemon = await db.pokemon.findAll()
    console.log(pokemon)
    // render them on a favorites page
    res.render('favorites.ejs', { favorites: pokemon })
  } catch(err) {
    console.log(err)
    res.send('server error')
  }
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  try {
    // find or create the pokemon in the db
    await db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      }
    })
    // redirect to favorites
    res.redirect('/pokemon')
  } catch(err) {
    console.log(err)
    res.send('server error')
  }

});

module.exports = router;
