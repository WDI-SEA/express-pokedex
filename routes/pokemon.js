const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios')

router.get('/', async (req, res) => {
  // get all faves from db
  const allPokemon = await db.pokemon.findAll()
  // render faves page
  
  res.render('pokemon.ejs', { allPokemon })
  
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // console.log(req.body)
  // create new pokemon in db
  await db.pokemon.create({
    name: req.body.name
    
  })
  // redirect to show all fave -- does not exist yet
  res.redirect('/pokemon')
})


module.exports = router;
