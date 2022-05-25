const express = require('express');
const router = express.Router();
 const db = require('../models')
 const axios = require('axios')
 //const controller = require('../controllers')
// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
    const pokemonFromDb = await db.pokemon.findAll()
    // const allFaves = await db.pokemon.findAll()
    // res.render('pokemon/index.ejs', {pokemon: allFaves})



  const context = {
    pokemon: pokemonFromDb,
    title: 'fav pok'
  }

  //res.send({pokemonFromDb});
  res.render('pokemon/index.ejs', context)
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  const favePokemon = await db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }

    })

  // await db.fave.create({
  //   name: req.body.name

  // })
  res.redirect('/pokemon')
});

router.get
module.exports = router;
