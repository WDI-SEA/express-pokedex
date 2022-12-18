const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  try {
    // TODO: Get all records from the DB and render to view
    //READ function to find all favorite pokemon
    const favPokemon = await db.pokemon.findAll()
    res.render('favs.ejs', {
      favPokemon: favPokemon
    })
  } catch (error) {
    console.log(error)
  }
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  try {
    // create a new fave in the db
    await db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      }
    })
    // redirect to /faves to show the user their faves
  } catch (err) {
    console.log(err)
  } 
  res.redirect('/pokemon')
 

});

// add a get route to render a show page that pull information from the api provided

// get route 
// link the pokemon to the api 
// axios to get info from api (like a fetch)

router.get('/:name', async (req,res) =>{
  try {
    const url = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`

    const response = await axios.get(url)
    // console.log(response.data)
    res.render('show.ejs' , {
      pokemon: response.data,
      name: req.params.name
    })

  } catch (error) {
    console.log(error)
  }
})


// render page

router.get

module.exports = router;
