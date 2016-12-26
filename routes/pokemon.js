var express = require('express');
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/pokemon', function(req, res) {
  res.send('Render a page of favorites her');
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  res.send(req.body);
  console.log(req.body.name);
});

module.exports = router;
