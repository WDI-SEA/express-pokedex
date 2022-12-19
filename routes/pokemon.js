const { application } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async function (req, res) {
  // TODO: Get all records from the DB and render to view
  try {
    const favePokes = await db.pokemon.findAll()
    res.render('favePokes.ejs', {
      favePokes: favePokes
    })
  }
  catch (err) {
    console.log('FIRE FIRE FIRE', err)
    res.send(500).send('internal server error')
  }
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async function (req, res) {
  // TODO: Get form data and add a new record to DB
  try {
    const pokeArray = db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      },
      defaults: {
        name: req.body.name
      }
    })
    res.redirect('/')

  }
  catch (err) {
    console.log('FIYAAAAAAAAA', err)
    res.status(500).send('api error')
  }
});

// router.get('/pokemon/details')

module.exports = router;
