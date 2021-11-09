const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models')



// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  // res.send('Render a page of favorites here');
  db.pokemon.findAll()
    .then(faves => {
      res.render('indexFaves', {results: faves })
    })
    .catch(error => {
      console.log(error)
    })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  const data = JSON.parse(JSON.stringify(req.body))
    console.log('this is data', data)
    db.pokemon.create({
        name: data.name
    })
    .then( ()=> {
        res.redirect(`/pokemon/`)
    })
    .catch(error => {
        console.log(error)
        // we can also use console.error
    })
});


router.delete('/:name', (req, res) => {
  db.pokemon.destroy({
      where: { name: req.params.name }
  })
  .then(deletedItem => {
      res.redirect('/pokemon')
  })
  .catch(error => {
      console.error
  })
})

router.get('/:name', (req,res)=> {
  let pokemonInfo = req.params.name

  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonInfo}/`)
    .then(apiRes => {
      console.log('this is apiRES.data', apiRes.data)
      let pokemonNum = apiRes.data.id
      let pokemonName = apiRes.data.name
      let pokemonWeight = apiRes.data.weight
      let pokemonImage = apiRes.data.sprites.front_default

      res.render('faveDetail', {pokemonNum, pokemonName, pokemonWeight,pokemonImage})
    })
    .catch(error => {
      console.log(error)
    })
})



module.exports = router;
