var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var db = require('../models');
var request = require('request');
var path = require("path");
var methodOverride = require('method-override');
var router = express.Router();

var app = express();

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.use(ejsLayouts);

// from this dude: http://stackoverflow.com/questions/34926876/override-method-get-to-delete-in-nodejs-using-anchor-tag
router.use(function(req, res, next) {
    if (req.query._method == 'DELETE') {

        req.method = 'DELETE';
        req.url = req.path;
    }
    next();
});



// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    db.pokemon.findAll().then(function(favoritePokemon) {
        res.render('favorites', { pokemon: favoritePokemon });
    }).catch(function(err) {
        res.send("oops there was an error:" + err);
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    var pokemon = req.body.name;

    db.pokemon.create({
        name: pokemon
    }).then(function() {
        res.redirect('/pokemon');
    });

});
//shows info of pokemon when click on from index
router.get('/:id', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.id;
    request(pokemonUrl, function(err, response, body) {
        if (err) {
            console.log(err);
        }
        var pokemon = JSON.parse(body);
        pokemon.typesCommaSeparated = pokemon.types.map(function(type) {
            return type.type.name;
        }).join(", ");

        pokemon.abilitiesCommaSeparated = pokemon.abilities.map(function(ability) {
            return ability.ability.name;
        }).join(", ");

        res.render('pokemon', pokemon);
    });
});

router.get('/:name', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name.toLowerCase();
    request(pokemonUrl, function(err, response, body) {
        if (err) {
            console.log(err);
        }

        var pokemon = JSON.parse(body);
        pokemon.typesCommaSeparated = pokemon.types.map(function(type) {
            return type.type.name;
        }).join(", ");

        pokemon.abilitiesCommaSeparated = pokemon.abilities.map(function(ability) {
            return ability.ability.name;
        }).join(", ");

        res.render('pokemon', pokemon);

    });
});

router.delete('/:name', function(req, res) {
    var pokemonToDelete = req.params.name;

    db.pokemon.destroy({
        where: {
            name: pokemonToDelete
        }
    }).then(function() {
        res.status(204).redirect('/pokemon');
    });
});

module.exports = router;
