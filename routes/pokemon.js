const express = require('express');
const router = express.Router();

//require db
const db = require("../models");
const { default: axios } = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  // res.send('Render a page of favorites here');
  //select all pokemon from the db
  try {
    //select all pokemon from the db
    const allFavorites = await db.pokemon.findAll()
    // console.log('favorites', allFavorites)

    //created favorites in views 
    res.render("favorites", {pokemon: allFavorites})
  }catch {
    console.error(err)
  }
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB

  //req.body is the form from the homepage, what we get when the submit button is pushed
  //req.param is the url
  // res.send(req.body);

  //search for this name in the database, if you find it, do nothing, if you don't, create it
  try {
    const newFave = await db.pokemon.findOrCreate({
      where: {
        //the re.body.name comes from the form
        name: req.body.name
      }
    })

    //this takes us to favorites page where we can see itadded a new pokemon
    res.redirect("/pokemon")
  } catch (err) {
    console.error(err)
  }
});

// GET /pokemon/:name - reecieve name from req params nd query the data
router.get('/:name', async (req, res) => {
  try {
    //check for name
    let pokeName = req.params.name
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
    const foundData = await axios.get(apiUrl)
    res.render("show", {pokemon: foundData.data})
  }catch (err) {
    console.error(err)
  }
})

module.exports = router;
