require('dotenv').config();
var express = require('express');
var router = express.Router();
var db = require('../models');
var allDataPoke = []

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then((poke)=>{
    res.render('show',{ poke})
  })
  .catch((err)=>{
    console.log('err',err)
    res.render('404')
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database


router.post('/',(req,res)=>{

  db.pokemon.create(req.body)
  .then(()=>{
    res.redirect('/pokemon')
  })
  .catch((err)=>{
    console.log('error',err)
    res.render('404')
  })
});

module.exports = router;
