var express = require('express');
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    //res.send('Render a page of favorites here');
    db.pokemon.findAll.then(function(pokemon) {
        res.render('pokemon/index.ejs', { pokemon: pokemon });
    }).catch(function(error) {
        res.status(404).send(error);
    });

});

//Show//
router.get('/pokemon/:id', function(req, res) {
    var nameOfThePokemon = req.params.id;
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/',
        name;

    db.pokemon.findOne({
        where: {
            name: nameOfThePokemon
        }
    }).then(function(pokemon) {
        if (pokemon) {
            res.render('pokemons-show', { pokemon: pokemon });
        } else {
            res.status(404).send("Doesn't exist :(");
        }
    }).catch(function(error) {
        res.status(404).send(error);
    });

});



// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    db.favorite.create({
        name: req.body.name
    }).then(function(poke) {
        console.log('created', poke.name);
        res.redirect('/pokemon');
    });
});



module.exports = router;
