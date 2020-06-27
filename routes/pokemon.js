var express = require('express');
var router = express.Router();
const db = require('../models');
const axios = require('axios'); 


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon){
    //the pokemon that EJS is expecting is the pokemon variable I have here
    //object literal is pokemon:pokemon
  res.render("favorites", {pokemon: pokemon});
  });
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post("/", function(req, res) {
    //posts are mounted on the req body object
  let favedPoke = req.body.name;
  db.pokemon.findOrCreate({
    //key value pair where is where and the value is another object
    where: {name : favedPoke}
  }).then(([pokemon, created]) => {
    console.log(`We added ${pokemon.name} to our favorite Pokemon!`)
    res.redirect("/pokemon");
  }) 
});

// Add a route GET /pokemon/:id that renders a show page with 
// information about the Pokemon with the corresponding row id.
router.get("/pokemon/:id", function(req, res) {
      let search = req.params.id
      let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${(search).toLowerCase()}`;
      //make a GET request to the PokeApi 
        axios.get(pokemonUrl).then( function(apiResponse) {
          let peach = apiResponse.data.results;
          console.log("here are the facts you wanted: ", JSON.parse(peach), "🍑")
          res.render("show", {pokemon : search})
      })
   })
  
module.exports = router;
