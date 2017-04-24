var express = require('express');
var router = express.Router();
var db = require("../models");
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var methodOverride = require('method-override');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.pokemon.findAll({

    }).then(function(pokemon) {
        res.render('faves', { pokemon: pokemon });
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    var newPokeToFave = req.body;
    var newPoke = {
        name: newPokeToFave.name
    };

    db.pokemon.findOrCreate({ where: newPoke }).then(function(pokemon) {
        res.status(303).redirect('/pokemon');
    }).catch(function(error) {
        res.status(404).send(error);
    });
});

router.get('/:id', function(req, res) {
    var idOfPoke = req.params.id;
    db.pokemon.findOne({
        where: {
            id: idOfPoke
        }
    }).then(function(pokemon) {
        var pokeURL = 'http://pokeapi.co/api/v2/pokemon/' + pokemon.name;
        request(pokeURL, function(error, response, body) {
            var pokeProfile = JSON.parse(body);
            res.render('details', { pokemon: pokeProfile });
        });
    }).catch(function(error) {
        res.status(404).send('POKEMON NOT FOUND');
    });

});

router.delete('/:id', function(req, res) {
    console.log('deleting' + req.params.id);
    var idOfPoke = req.params.id;
    db.pokemon.destroy({
        where: {
            id: idOfPoke
        }
    }).then(function(pokemon) {
        res.redirect('/pokemon');
    }).catch(function(error) {
        res.send('error');
    });
});


module.exports = router;
