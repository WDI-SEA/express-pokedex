const express = require('express');
const db = require('../models')
const router = express.Router();
const axios = require('axios'); 

router.get('/', async (req, res) => {
  try {
    //get all faves from db
    const allPokemon = await db.pokemon.findAll()
    //render faves page
    res.render('pokemon.ejs', { allPokemon })
  } catch (err) {
    console.warn(err)
  } 
})

//POST /faves -- CREATE new fave
router.post('/', async (req, res) => {
  try {
    // console.log(req.body)
    //create new fave in db
    // await db.fave.create(req.body) 
    await db.pokemon.create({//more specific
      name: req.body.name
    }) 
    //redirect to show all faves -- does not exist yet
    res.redirect('/pokemon')
  } catch(err) {
    console.warn(err)
  }
})

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
