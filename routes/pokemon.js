var express = require('express');
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  res.send('Render a page of favorites here');
});
//          ^^change to res.render and display data from sql db



// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  res.send(req.body);
});

module.exports = router;
