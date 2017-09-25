//this is just like index.js but for all the /pokemon routes
var db = require('../models');
var express = require('express');
var router = express.Router(); // this just configures my routes
var request = require('request');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var methodOverride = require('method-override');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

var controllers = require('../controllers');
var pokemon = controllers.pokemon;

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    pokemon.getFavorites().then(function(pokemon) {
        res.render('favorite', { pokemon: pokemon });
    }).catch(function(error) {
        res.status(404).send(error);
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    pokemon.createFavorite(req.body)
        .then(function(result) {
            return res.send(result);
            res.render('favorite', { pokemon: result });
        })
        .catch(function(error) {
            return res.send(error);
        });
});

router.get('/:id', function(req, res) {
    var name = req.params.id;
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + name;
    router.use('/public', express.static(path.join(__dirname, 'public')));

    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body);
        res.render('entry', { pokemon: pokemon });
    });
});
//delete not working
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

//this is where I'm exporting my pokemon routes to index.js
module.exports = router;