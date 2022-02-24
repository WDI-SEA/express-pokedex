const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models')
// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
try{
  const allPokemon = await db.pokemon.findAll();

  res.render('faves', {favePokemon: allPokemon});
} catch(error){
  console.log(error)
}
  
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  try{

    await db.pokemon.create({
      name: req.body.name
    })

    res.redirect('/pokemon')
  } catch (error){
    console.log(error)
  }
  

});

router.get('/:name', (req, res)=>{

  const url = (`http://pokeapi.co/api/v2/pokemon/${req.query.name}/`)
  const response = axios.get(url)
  .then(response =>{
    let name = req.query.name
    let photo = response.data.sprites.other['official-artwork'].front_default
    let type = response.data.types[0]['type'].name
    let hp = response.data.stats[0]['base_stat']
    let attack = response.data.stats[1]['base_stat']
    let defense = response.data.stats[2]['base_stat']
    let specialAttack =  response.data.stats[3]['base_stat']
    let specialDefense =  response.data.stats[4]['base_stat']
    let speed =  response.data.stats[5]['base_stat']


    
    res.render('show', {name: name, photo: photo, type: type, hp: hp, attack: attack, defense: defense, specialAttack: specialAttack, specialDefense: specialDefense, speed: speed})

  })




})

module.exports = router;
