const express = require('express');
const router = express.Router();
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
    .then(faves => {
      res.render('indexFaves', {results: faves})
    })
    .catch(error => {
      console.log(error);
    })
  //res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  const data = JSON.parse(JSON.stringify(req.body))
  db.pokemon.create({
    name: data.name,
  })
  .then(createFave => {
    res.redirect(`/pokemon`)
  })
  .catch(error => {
    console.log(error);
  })
  .finally(createdPokeFave => {
    console.log(createdPokeFave);
  })
});

module.exports = router;
