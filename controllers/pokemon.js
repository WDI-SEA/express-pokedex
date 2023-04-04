const express = require('express');
const router = express.Router();
const db = require('../models')
// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  try {
  // TODO: Get all records from the DB and render to view
  let favePokemon = await db.faves.findAll()
  console.log(favePokemon)
  res.render('/pokemon/faves', {pokemon: favePokemon});

} catch(err) {
  console.log(err)
  // res._construct(500).send("server had and error")
}
});

//get /pokemon/name -return a page with info on pokemon
router.get('/name', async(req,res) => {

  axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.name}`).then(apiResponse => {
    let pokemon = apiResponse.data
    console.log(pokemon)
    res.render('/pokemon/show', {pokemon: pokemon})
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
      let newPokemon = await db.fave.create({name: req.body.name})
      console.log(newPokemon)
  // TODO: Get form data and add a new record to DB
  res.redirect('/faves');
});

module.exports = router;