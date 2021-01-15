const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 
// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
 
  db.pokemon.findAll().
  then(pokemonsInfo=>{
    res.render('pokemon/index.ejs',{pokemons:pokemonsInfo})
    process.exit()
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  
  db.pokemon.findOrCreate({
    where: { name: req.body.name }
  }).then(([pokemonFav, wasCreated]) => {
    // console.log("👏")
    // console.log(pokemonFav); // returns info about the user
    // console.log("❤")
    // console.log(wasCreated)
    
    res.redirect('/')
  });
  // TODO: Get form data and add a new record to DB
});
router.get('/:name',(req,res)=>{
  let pokemonDetail=`http://pokeapi.co/api/v2/pokemon/${req.params.name}/`
  axios.get(pokemonDetail).then(response=>{
    console.log("👌")
    console.log(response.data)
    //res.send(response.data)
    //axios.get(response.data.abilities.)
    res.render('pokemon/detail.ejs',{details:response.data,name:req.params.name})
  })

})
module.exports = router;
