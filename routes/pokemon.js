const { name } = require('ejs');
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
    const pokeArray = await db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      },
      defaults: {
        name: req.body.name
      }
    })
    res.redirect('/pokemon')
  }
  catch (err) {
    console.log('FIYAAAAAAAAA', err)
    res.status(500).send('api error')
  }
});



async function deleteItemFromDatabase(pokeName) {
  try {
    // Delete the item with the specified id
    await poke.destroy({
      where: {
        name: name
      }
    })
  } catch (error) {
    throw error
  }
}

router.delete('/pokemon/:name', async (req, res) => {
  try {
    // Get the item id from the URL parameters
    const pokeName = req.body.name

    // Delete the item from the database
    await deleteItemFromDatabase(pokeName)

    // Send a success response
    res.send({ success: true })
  } catch (error) {
    // Send an error response
    res.status(500).send({ success: false, error: error.message })
  }
})
// router.get('/pokemon/details')

module.exports = router;
