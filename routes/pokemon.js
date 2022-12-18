const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon 
router.get('/', async (req, res) => {
  try {
    // READ function to find all favorited pokemon
    const favePokemonInput = await db.pokemon.findAll()
    res.render('faves.ejs', {
      favePokemon: favePokemonInput
    }) 
  } catch (error) {
    console.log(error.message)
  }
  // TODO: Get all records from the DB and render to view
  // res.send('Render a page of favorites here')
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  //console.log(req.body.name)
  try {
    await db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      }
    })
  } catch (error) {
    console.log(error.message)
  }
  // TODO: Get form data and add a new record to DB
  res.redirect('/pokemon')
});

//add GET ROUTE to render show page that pulls info from api provided

//GET /pokemon 
router.get('/:name', async(req,res) => {
  try{
    const url =`http://pokeapi.co/api/v2/pokemon/${req.params.name}`
    // console.log(url)
    // res.json(response.data)
    const response = await axios.get(url)
    res.render('show.ejs', {
      pokemon: response.data,
      name: req.params.name
    })
    // console.log(response.data)
  }catch(error){
    console.log('error', error)
    res.status(500).send('api error')
  }
})

module.exports = router;
