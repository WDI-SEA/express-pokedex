//this is just like index.js, but for all the '/pokemon routes'
var express = require('express');
var router = express.Router();//this is just configures my routes

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    res.send('Render a page of favorites here');
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    res.send(req.body);
});

//this is where i'm exporting my '/pokemon' routes to index.js
module.exports = router;
