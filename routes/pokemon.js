const express = require('express');
const router = express.Router();
const db = require("../models")
const axios = require('axios')

router.get('/:id', (req, res) => {
  // get name associated with this id from our db
    // get name from req.query
    let name = req.query.name

  // get extra information for pokemon at id
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((apiRes) => {
        let imgSrc = apiRes.data.sprites.front_default
        let pokeId = apiRes.data.id
        let types = apiRes.data.types[0].type.name
        res.render('pokemon/show', {src: imgSrc, id:pokeId, type: types})
      })
      .catch(err => console.log(err))
    //info we want to get: pokeAPI id, pokeAPI chara img, types
  // render a apge with pokemon detail's passed back from our API call
} )
// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(result => {
    // render pokemon/favorites
    res.render('pokemon/index', {pokemons: result})
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  let name = req.body.name
  db.pokemon.findOrCreate({
    where: {
      name: name
    }}).then((data) => {
      res.redirect('/pokemon')
  })
  .catch((err) => {
    console.log(`we found a booboo: ${err}`)
  })
  //redirect to home page
    
  
})


module.exports = router;

