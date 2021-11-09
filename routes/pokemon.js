const express = require('express');
const db = require('../models');
const router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll()
  // TODO: Get all records from the DB and render to view
  .then(faves => {
    res.render('indexFaves', { results: faves });
  })
  .catch(error => {
    console.error
  })
  
});

// SHOW ROUTE
router.get('/:name', (req, res) => {
  let pokemon = req.params.name
  console.log("Show route test")
  res.render('/show.ejs', { pokemon: pokemon })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body))
  console.log('this is data: ', data)
  db.pokemon.create({
    pokeName: data.name
  })
  // TODO: Get form data and add a new record to DB
  .then(createdFave => {
    //res.send(req.body);
    res.redirect('/pokemon')
  })
  .catch(error => {
    console.error
  })
});



module.exports = router;
