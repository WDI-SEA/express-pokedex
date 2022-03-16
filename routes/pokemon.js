const express = require('express');
const router = express.Router();
const db = require('../models')


// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  try{
    const allFaves = await db.pokemon.findAll()
    res.render('pokemon.ejs', {pokeFav:allFaves});
    // res.json(allFaves)
  }catch(error){
    console.log(error)
  }
  
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  try {
    await db.pokemon.create({
      name: req.body.name,
    })

    res.redirect('/pokemon')
  } catch (error) {
    console.log(error)
  }
  // TODO: Get form data and add a new record to DB
  ;
});
//router.delete db.pokemon.destroy
module.exports = router;

