var express = require('express');
var router = express.Router();
var models = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites from database
    res.render('pokemon.ejs');
});

// POST - receive the name of a pokemon and add it to the database
router.post('/:id', function(req, res) {
    // TODO: add to database
    res.send(req.body);
    //redirect to /root
});

module.exports = router;
