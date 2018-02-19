var express = require('express');
var request = require('request');
var router = express.Router();
var db = require('../models');

// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(ejsLayouts);

router.get('/', function(req, res){
  res.redirect('/');
});

router.get('/:id', function(req, res){
  console.log('triggering');
  var selectedUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.id;
  request(selectedUrl, function(error, response, body){
    var selected = JSON.parse(body);
    // res.send(selected);
    res.render('pokemon.ejs', {selected: selected});
  });
});


module.exports = router; 