const { default: axios } = require('axios');
const express = require('express');
const { redirect } = require('express/lib/response');
const router = express.Router();
const db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
// TODO: Get all records from the DB and render to view
  //waits till it finds all the pokemon in the database (psql (database ---->)/c pokedex, (details about the database ---->)/dt, (select one of the data bases to see all of its content ----->)SELECT * FROM pokemons to see the table of pokemon)
  //the table in psql is pruler while in he code its sigular (so in the table its pokemons and in the code its pokemon
  //findAll() looks at all the contect in the table)
  //first it foes into the database of pokedex then finds the pokemons table and findAll() the content
router.get('/', async(req, res) => {
  // TODO: Get all records from the DB and render to view
  const pokemons = await db.pokemon.findAll()
  //we are passing in the allPokemon variable
  res.render('pokemon/index.ejs', {pokemons});
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async(req, res) => {

  // TODO: Get form data and add a new record to DB\
  //this line waits till the code goes into the database and into the table and creates a new element with the data we got from req.body
  await  db.pokemon.create(req.body)
   //after you have pressed the button to add a spacific pokemon to your faves list it will redirect you too the /pokemons page 
  //the button was made in the views folder in the index.ejs file
  res.redirect('/pokemon')
});

//SHOW -- GET ROUTER
router.get('/:name', async (req, res) =>{
   //this is a url with params at the end. the params grab whats at the end of a url on the page and insert in into this url
  let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`;
  //this line waits till the axios (.gets) reads the info in this url 
  const pokemonData = await axios.get(pokemonUrl)

  console.log(pokemonData.data)

    res.render('pokemon/show.ejs', {
      name: req.params.name,
      //this geos into the API and then goes to the data object
      pokemonData
    })
})

module.exports = router;
