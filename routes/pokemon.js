const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require("../models")

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then((favePokemon) => {
    res.render("pokemon/index", {favePokes: favePokemon}) //was showing up like object: object because in pokemon index.ejs i didn't specify .name
  }) .catch(err => {
    console.log(err)
  })
 
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  try{
    await db.pokemon.create({name: req.body.name})
    res.redirect('/pokemon') //automatically finds the get route in the /pokemon route
  } catch (err) {
    console.log(err)
  }
  //res.send(req.body);
});


//step 4 get one individual pokemon and display description
router.get("/:name", (req,res) => {
  let pokeName = req.params.name
  console.log(pokeName)
  axios.get(`http://pokeapi.co/api/v2/pokemon/${pokeName}/`)
  .then(apiRes => {
    let imgSrc = apiRes.data.sprites.front_shiny
    let types = apiRes.data.types[0].type.name
    let height = apiRes.data.height
    let weight = apiRes.data.weight
    res.render("pokemon/show", {

  
    height,
    weight,
    imgSrc,
    types

    })

  })
})

module.exports = router;
