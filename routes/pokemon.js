const express = require('express');
const router = express.Router();
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  // res.send('Render a page of favorites here');
  db.pokemon.findAll()
  .then(pokes => {
    res.render('favorites.ejs', {results: pokes})
  })
  .catch(error => {
    console.error
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
  .then(addedPoke => {
    console.log('new poke:', addedPoke)
    res.redirect('/pokemon')
  })
  .catch(error => {
    console.error
  })
  // res.send(req.body);
});

module.exports = router;
