var express = require('express');
var router = express.Router();
var db = require('../models');
router.use(require('morgan')('dev'))
var bodyParser = require('body-parser');
var request = require('request');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
db.pokemon.findAll()
.then(function(pokes) {
  res.render('favorites.ejs', {
    pokemon: pokes
  });
})
.catch((err)=>{
  console.log(err)
  res.render('404.ejs')
  })
});
// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
db.pokemon.create({
  name: req.body.name
})
.then(() => {
  res.redirect('pokemon');
})
.catch((err)=>{
  console.log('error',err)
  res.render('404')
  }) 
});

router.get('/:name', (req, res) => {

  request('https://pokeapi.co/api/v2/pokemon/' + req.params.name, (err,response, body) => {
if (err){
  res.render('404')
}else{
    res.render('show.ejs', {
      pokemon: JSON.parse(body)
      })
    }
  })
})
module.exports = router;


