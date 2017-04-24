var express = require('express');
var router = express.Router();
var db = require("../models");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

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

module.exports = router;
