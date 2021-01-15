const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll()
  .then(pokemons => {
    res.render('pokemon', { pokemons } )
  })
  // res.send('Render a page of favoritessdfsdfasd here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
 db.pokemon.findOrCreate({
   where: { name: req.body.name }
 }).then(pokemon =>{
   console.log(`Pokemon ${req.body.name} was favorited!`)
   res.redirect('pokemon');
 }).catch(err => {
   console.log(err)
   res.send(404)
});
});

// GET /pokemon/:name
router.get('/:name', (req, res) => {
  console.log(req.params.name)
  res.send(`Here is info on your fave ${req.params.name}`)
  // res.render('detail')
});
module.exports = router;
