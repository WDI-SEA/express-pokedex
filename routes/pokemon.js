const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  res.render('');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokefav.create(req.body)
  .then(() => {
    console.log(req.body)
    res.redirect('/pokemon')
  }
  ).catch((error) => {
    console.log(error)
  })
});

module.exports = router;
