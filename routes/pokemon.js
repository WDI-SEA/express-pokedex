const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  try {
    // TODO: Get all records from the DB and render to view
    const locatePoke = await db.pokemon.findAll() 
    res.render('favorites', { pokemon: locatePoke });
  } catch (error) {

    console.log(error, 'error');

  }
    
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  try {
    // TODO: Get form data and add a new record to DB
    await db.pokemon.findOrCreate({
      where: {
        name: req.body.name,
      },
    });
    res.redirect('/pokemon');
  } catch (error) {

    console.log(error, 'error');
  }
  
});

// GET/:ID
router.get('/:name', async (req, res) => {
  try {
    if(req.params && req.params.name) {
      const webURL = `https://pokeapi.co/api/v2/pokemon/${req.params.name.toLowerCase()}`;
      const result = await axios.get(webURL);
      let webData = result.data; 
      res.render('show', { pokedata: webData });
    }

  } catch (error){

    console.log('error');

  }

});

//Delete /pokemon 
router.delete("/", async (req, res) => {
  try {
    await db.pokemon.destroy({
      where: {
        name: req.body.name,
      },
    });
    res.redirect("/pokemon");
  } catch (error) {
    console.log("error");
  }
});

module.exports = router;

