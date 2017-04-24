var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));



// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    // res.send('Render a page of favorites here');
    db.favorite.findAll().then(function(favorite) {
        res.render('favorite', { favorite: name });
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    var newFavoriteName = req.body;
    var newName = {
        name: newFavoriteName.name
    };

    db.favorite.create(newName).then(function(favorite) {
        res.status(303).redirect('/favorite');
    }).catch(function(error) {
        res.status(404).send(error);
    });
});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    db.favorite.findOne({
        where: {
            id: id
        }
    }).then(function(favorite) {
        var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + name.toLowerCase();
        request(pokemonUrl, function(error, response, body) {

            pokemon.typesCommaSeparated = pokemon.types.map(function(type) {
                return type.type.name;

            }).join(",");

        }).catch(function(error) {
            res.status(404).send('Not Found');
        });
    });

});

router.delete('/:id', function(req, res) {
    console.log('delete' + req.params.id);
    var id = req.params.id;
    db.favorite.destroy({
        where: {
            id: id
        }
    }).then(function(favorite) {
        res.redirect('/favorite');

        // }).catch(function(error) {
        //     res.send('error');
        // });
    });
});




module.exports = router;
