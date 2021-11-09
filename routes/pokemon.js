const express = require('express');
const db = require('../models');
const router = express.Router();


// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll()
  .then(fave =>{
    res.render('favorites.ejs', {results:fave})
  })
  .catch(error => {
    console.error
  })
  // TODO: Get all records from the DB and render to view
//   res.send('Render a page of favorites here');
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body))
  console.log('this is data', data)
  db.pokemon.create({
    name: data.name
  })
  .then(createdFave =>{
    res.redirect("/pokemon")
  })
  .catch(error => {
    console.log(error)
  })
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
})

module.exports = router