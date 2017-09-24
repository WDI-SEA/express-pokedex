//this is just like index.js but for all the pokemon routes
var express = require('express');
var router = express.Router(); //this just configures my routes
var db = require('../models');

var saveToDb = function(nameofPokemon){
  db.pokemon.create({
    name: nameofPokemon
  }).then(function(data){
    console.log(data);
  });
};

var selectAllFromDb = function(){
  db.pokemon.findAll().then(allPokemon => {
    return allPokemon;
  });
};

var selectOneFromDb = function(nameOfPokemon){
  db.pokemon.find({
  where: {name: nameOfPokemon}
}).then(function(data) {
  console.log(data);
});
};



// GET - return a page with favorited Pokemon
router.get('/mypokedex', function(req, res) {
    var myPokemon = selectAllFromDb();
    console.log('00000000000000000' + myPokemon);
    res.render('favorites', {myPokemon: myPokemon});
});


// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    var myNewPokemon = req.body.name;
    console.log(req.body.name)
    saveToDb(myNewPokemon);
    res.redirect('/pokemon/mypokedex');
});





module.exports = router; //this is where routes are exported
