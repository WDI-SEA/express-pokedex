const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')
router.get('/', async (req, res) => {
  try{
    const find = await db.pokemon.findAll()
    res.render('../views/faves.ejs',{
      pokemon: find
    })
  }catch(error){
    res.send('error')
  }
});

router.post('/', async (req, res) => {
  try{
    const add = await db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      }
    })
    res.redirect('/pokemon');
  }catch(error){
    res.send('error')
  }
});

router.get('/:name',async function(req,res){
  try{
    let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`
    const pokemon = await axios.get(pokemonUrl)
    res.render('show.ejs',{
      pokemon: pokemon.data,
      name: req.params.name
    })

  }catch(error){
    res.send('messed up')
  }
})

module.exports = router;
