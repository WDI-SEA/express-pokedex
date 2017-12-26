var express = require('express');
var router = express.Router();
var db = require('../models')

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    // db.favorite.findAll().then(function(favorite){
      res.render('favorites/all', {favorites: favorites});
    });
    // res.send('Render a page of favorites here');
// });

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    db.favorite.create(req.body).then(function(favorite){
      res.redirect('/favorites');
    }).catch(function(err){
      res.status(500).render('error');
    });
    // res.send(req.body);
});

module.exports = router;
