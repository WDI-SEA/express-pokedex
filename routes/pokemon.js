var express = require('express');
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    res.render('./pokemon/favorite');
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database

});

module.exports = router;
