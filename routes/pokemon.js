var express = require('express');
var router = express.Router();
let db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
    .then((pokemon)=>{
        res.render('fave',{pokemon})
      })
      .catch((err)=>{
        console.log('Error',err)
        res.render('error')
      })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOne({
    where: {name: req.body.name},
  })
  .then((pokemon)=>{
    if(!pokemon){
      db.pokemon.create(req.body)
      .then()
      .catch((err)=>{
        console.log('Error',err)
        res.render('error')
      })
    } 
    res.redirect('/pokemon')
  })
  .catch((err)=>{
    console.log('Error',err)
    res.render('error')
  })
  
});

module.exports = router;
