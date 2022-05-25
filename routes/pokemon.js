const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 


// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  try {
    const allPokeFaves = await db.pokemon.findAll()
    res.render("pokemon.ejs",{allPokeFaves})
  } catch(err){
    console.warn(err)
  }
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  try {
    const favePoke = await db.pokemon.create({
      name: req.body.name
    })
    res.redirect("/pokemon")
  } catch(err){
    console.warn(err)
  }
});

router.get("/:name", async function(req,res){
  try {
    const pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`;
    // Use request to call the API
    const pokemon = await axios.get(pokemonUrl)
      res.render('show.ejs',{
        name: req.params.name,
        pokemon: pokemon.data
    })
  } catch (err) {
    console.warn(err)
  }
}) 

router.delete("/:name", async function(req,res){
  try{
    const delPoke = await db.pokemon.findOne({
      where:{
        name: req.params.name
      }
    })
    await delPoke.destroy()
    res.redirect("/pokemon")
  } catch(err){
    console.warn(err)
  }
})

module.exports = router;
