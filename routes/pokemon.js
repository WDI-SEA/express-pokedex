var express = require('express');
const db = require('../models');
const { default: Axios } = require('axios');
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.favorites.findAll()
    .then(favorites =>{
      console.log("favorites", favorites);
      res.render('favorites/index', {favorites});
    }).catch(error => console.log(error))
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.favorites.findOrCreate({
    where: {
      name: req.body.name,
      url: req.body.url
    }
  }).then(createdFavorite => {
    res.redirect('/pokemon'); 
  }).catch(error => console.log(error));
});

router.get('/:id', function(req,res) {
  db.favorites.findOne({
    where: {
      id: req.params.id
    }
  }).then(favorite => {
    let pokemonUrl = favorite.url;
    Axios.get(pokemonUrl).then(apiResponse => {
      let thisPokemonInfo = apiResponse.data;
      console.log("response: ", thisPokemonInfo);
      res.render('favorites/show', {thisPokemonInfo})
    })
  })
})

module.exports = router;
