var express = require('express');
var router = express.Router();
var db = require('../models');
var router = express.Router();

// GET - return a page with favorited Pokemon
// router.get('/', function(req, res) {
//     // TODO: render favorites   //findAll function
//     res.send('Render a page of favorites here');
// });

//GET THE DATABASE OF FAVORITES, AND THEN RENDER THE FAVORITES PAGE
router.get('/', function(req, res) {
    db.pokemon.findAll().then(function(pokemon){  //grab all in my database
      res.render('favorites', {pokemon:pokemon} ); //render the page favorites with that database info
  });
});

  //grab a pokemon when a button is clicked on in index.ejs,
  //the pokemon.name grabs info from the pokemon.js file (identifies WHICH pokemon is being grabbed
  //we then grab all the info from that object here (req.body)
  //and post it to the database pokemon with the db.pokemon.create call
   //then we redirect to the pokemon favorites page
  //select that body, which is connected to the API,
  //then post that object to the databse, then redirect to the pokeomon page

// ADD THAT POKEMON TO MY DATABASE OF FAVROTIES
router.post('/', function(req, res) {
  db.pokemon.create(req.body).then(function(pokemon){
    res.redirect('favorites');
  });
});

//GET SPECIFIC POKEMON ID, AND REDIRECT TO THE SHOW PAGE?

module.exports = router;
