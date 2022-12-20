const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
// ADD require axios (GET name below) 
//const axios = require("axios"); 
// ADD require db
const db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  //res.send('Render a page of favorites here');
  // select all pokemons from the db
  try {
    const allFavorites = await db.pokemon.findAll()
    console.log("FAVES:", allFavorites)
    res.render("favorites", {pokemon: allFavorites})
  } catch(err) {
    console.log(err)
  }
  

});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  //res.send(req.body);
  try {
    const newFave = await db.pokemon.findOrCreate( {
      where: {
        name: req.body.name
      }
    })
    console.log("NEWFAVE:", newFave)
    res.redirect("/pokemon")
  } catch(err) {
    console.log(err)
  }
});

// GET /pokemon/:name -- recieve name from req params and query api, return data
router.get("/name", async (req, res) => {
  try {
    //res.send(req.params.name) // test to make sure we're capturing the string of the name (go to "favorites.ejs")
    const pokeName = req.params.name 
    const apiUrl = `https://pokeapi.co/api/pokemon/${pokeName}`
    const foundData = await axios.get(apiUrl)
    res.send(foundData.data)
    res.render("show", {pokemon: foundData.data})
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;
