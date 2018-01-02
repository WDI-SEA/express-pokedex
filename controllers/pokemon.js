var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');
// ejsLayouts
//request!!!
var db = require('../models');
var router = express.Router();

//router.use functions like SS??

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.favorite.findAll().then(function(user){
    //console.log(user);
    res.render('pokemon', { user: user });
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.favorite.create({
    name: req.body.name
  }).then(function(newPokemon) {
    console.log(newPokemon.get());

    res.redirect('/pokemon');
  });
  //res.send(req.body);

  //console.log(req.body.name);
  //var data = JSON.parse(req.body);
  //console.log(data.name);

});


//create a route that grabs the info api for each pokemon url
router.get('/:id', function(req, res){
  db.favorite.findById(req.params.id).then(function(pokemon){
    if(pokemon){
            var pokeUrl = 'http://pokeapi.co/api/v2/pokemon/'+pokemon.name+'/';
            console.log(pokeURL);
            request(pokeURL, function(error,response,body){
                var pokemon = JSON.parse(body);
                console.log(pokemon);
                res.render('pokemon/show', {pokemon:pokemon});
            });
          }else{
            res.status(404).send('error with the if');
          }
  }).catch(function(err){
        res.status(500).send('error with the request');
        console.log(err);
  });
});

//delete route
router.delete('/:id', function(req,res){
	console.log('Delete route. ID= ', req.params.id);
	db.favorite.destroy({
		where: { id: req.params.id}
	}).then(function(deleted){
		console.log('deleted = ', deleted);
		res.send('success');
	}).catch(function(err){
		console.log('An error happened', err);
		res.send('fail');
	})
});

module.exports = router;
