const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')



// TODO: Get all records from the DB and render to view
// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // Look into the database
  db.pokemon.findAll()
  .then(pokemons => {
    res.render('../views/favorites/pokemon_index.ejs', {favoritePokemons: pokemons}) 
    // we aliased our db handle as favoritePokemons to pokemons. We used a descriptive pluralized form in order to indicate the nature of the operation in our ejs file.
  })
  .catch(error => {
    console.error
  })
});


// * THIS ADDS A POKEMON TO THE DATABASE AND RETURNS THE USER TO THE "FRONT PAGE"
// * MUST EXPLICITLY INDICATE THE REDIRECTION ROUTE
router.post('/', (req,res) => {
  // console.log(req)
  // console.log(JSON.stringify(req.body))
  // console.log(JSON.parse((req.body))) 
  const formData = JSON.parse(JSON.stringify(req.body))
  console.log(formData)
  db.pokemon.create({
    name: formData.name
  })
  .then(createFavItem => {
    console.log(`DB Entry Created: \n ${createFavItem.name}`)
    res.redirect('/pokemon')
  })
  .catch(error => {
    console.error
  })
})


router.get('/:name', (req,res) => {
  
  
  
  let pokemonNameEndpoint = `https://pokeapi.co/api/v2/pokemon/${req.params.name}`

  axios.get(pokemonNameEndpoint)
    .then(apiResponse => {
      console.log(apiResponse.data)
      const viewData = apiResponse.data;
      res.render('../views/show', {pokemonDetail: viewData})
    }

    )
  }
)


router.delete('/:id', (req,res)=> {
  db.pokemon.destroy({
    where: {id: req.params.id }
  })
  .then(deletedPokemon => {
    res.redirect('/pokemon')
  })
  .catch(error => {
    console.error
  })
})








module.exports = router;
