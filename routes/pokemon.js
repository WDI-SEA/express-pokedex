const express = require('express');
const router = express.Router();
const axios = require('axios'); 
let db = require('../models')



// GET /pokemon - return a page with favorited Pokemon
router.get('/favorites/', (req, res) => {
  db.pokemon.findAll()
  .then(pokemons => {
    res.render('../views/favorites', { pokemons })
  })
  .catch((err) => {
    console.log('Err', err)
    res.send('404')
  })
});

router.get('/error', (req, res) =>{
  res.render('../error')
})

router.get('/favorites/:id', (req, res) => {
  db.pokemon.findByPk(req.params.id)
  .then(pokemon => {
    let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
    axios.get((pokemonUrl)+pokemon.name)
    .then((apiResponse)=> {
      // console.log(apiResponse)
      let pokeData = apiResponse.data
      res.render('../views/show', {pokemonName: pokemon.name, pokeData: pokeData})

    })
  })
  .catch((err) => {
    console.log('Err', err)
    res.send('404')
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/search', (req, res) => {
  let userSearch = req.body.searchName
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151';
  axios.get(pokemonUrl).then((apiResponse)=>{
    let searchedPoke = apiResponse.data.results
    for(let i = 0; i < searchedPoke.length; i++){
      if (searchedPoke[i].name == userSearch){
        res.render('index', { pokemon: searchedPoke.slice(i, (i + 1))})
      }
    }
  })
  .catch((err) => {
    console.log('Err', err)
    res.send('404')
  })
})


router.post('/favorites', (req, res) =>{
  db.pokemon.create(req.body)
  .then(newPokemon => {
    console.log('Created: ', req.body.name)
  })
  .then(res.redirect('/favorites/'))
});


/*------ Delete ------*/
router.delete('/delete/:id', (req, res) => {
  db.pokemon.findbyPk(req.params.id)
  .then(id => {
    console.log('Deleted', req.body.name)
    id.destroy();
  })
  .then(
    res.send('Pokemon Deleted, oh fuck!')
  )
})


module.exports = router;


/*-------------------- Taken out of /favorites, didn't work as intended -----------------------*/
