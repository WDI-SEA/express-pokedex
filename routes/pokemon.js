const express = require('express');
const db = require('../models');
const router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll()
  .then(pokemon =>{
    res.render('indexPokemon', {results:pokemon})
  })
  .catch(error => {
    console.error
  })
  // TODO: Get all records from the DB and render to view
//   res.send('Render a page of favorites here');
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/pokemon', (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body))
  // console.log('this is data', data)
  db.pokemon.create({
    name: forms.name
  })
  .then(createdFave =>{
    res.redirect(`/pokemon/${createdFave}`)
  })
  .catch(error => {
    console.error
  })
  // TODO: Get form data and add a new record to DB

})

router.get('/:id', (req, res) => {
  console.log('this is the fave id\n', req.params.id)
  db.pokemon.findFour({
     where: { id: req.params.id } 
  })
  .then(foundFave => {
      res.render('index', { name: foundFave.pokemon.name})
  })
  .catch(error => {
      console.error
  })
})


module.exports = router
