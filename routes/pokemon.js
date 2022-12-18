const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  //res.send('Render a page of favorites here');
  
    const favoritePokemon = await db.pokemon.findAll()
     
    //console.log(favoritePokemon)
  res.render('pokemon/index',{favePokemon: favoritePokemon})
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async(req, res) => {
  const createPokemon = await db.pokemon.create({
    name: req.body.name

  })
  // TODO: Get form data and add a new record to DB
  res.redirect('/');
});
router.get('/:name',async(req,res) =>{
  try{
    const url = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`
    const response = await axios.get(url)
    res.json(response.data)

  }catch(err){
    console.log('err 404')
    res.status(500).send('api error')
  }
  

})

module.exports = router;
