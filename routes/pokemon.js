var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-Layouts');
var db = require('../models');
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
     db.favorite.findAll().then(function(favorite){
       res.render('./pokemon/index', {favorite:favorite});
     });
});

router.get('/:id', function(req,res){
    db.favorite.findById(req.params.id).then(function(favorite){
        if(favorite){
            var pokeURL = 'http://pokeapi.co/api/v2/pokemon/'+favorite.name+'/';
            console.log(pokeURL);
            request(pokeURL,function(error,response,body){
                var favorite = JSON.parse(body);
                console.log(favorite);
                res.render('./pokemon/show', { favorite: favorite });
            });
        }else{
            res.status(404).send('error in the if');
        }
    }).catch(function(err){
        res.status(500).send('error to do request');
        console.log(err);
    });
});
// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    db.favorite.create(req.body).then(function(createArticle){
      res.redirect('/pokemon');
    });
});

router.delete('/:id', function(req, res){
  console.log('delete route. ID = ', req.params.id);
  db.favorite.destroy({
    where: { id: req.params.id}
  }).then(function(deleted){
    console.log('deleted = ', deleted);
    res.send('success');
  }).catch(function(err){
    console.log('error happened', err);
    res.send('fail');
  });
});

module.exports = router;
