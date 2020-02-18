var express = require('express');
const db = require('../models');

var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.favpokemon.findAll().then(
        (favpokemons) => {
            favpokemons.forEach(poke => {
                console.log(poke.name);
            });
            res.render('faves', { pokemon: favpokemons });
        });
    
    // TODO: Get all records from the DB and render to view
    // res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: Get form data and add a new record to DB
    if (req.body.name != null) {
        db.favpokemon.findOrCreate(
            {
                where: {
                    name: req.body.name
                }
            }
            )}
});

module.exports = router;