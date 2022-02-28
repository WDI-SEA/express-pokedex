const { response } = require('express');
const express = require('express');
const db = require('../models');
const router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  // res.send('Render a page of favorites here');
  try {
    const pokeFaves = await db.pokemon.findAll({raw: true, nest:true})      
    res.render('./favorites.ejs', {pokemon: pokeFaves})
  } catch (err) {
      res.send(`An error occured. Error details : ${err}`)
  }
  
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  // res.send(req.body.name);
  try {
    await db.pokemon.create({
      name: req.body.name
    })
  } catch (err) {
    console.log(err)
  }
  res.redirect('/pokemon')  
});

module.exports = router;
