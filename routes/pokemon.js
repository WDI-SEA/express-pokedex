var express = require('express');
var router = express.Router();
var db = require('../models');
var sequelize = require('sequelize');
var pg = require('pg');
var hstore = require('pg-hstore');

// const { Client } = require('pg');
// const client = new Client();

// GET - return a page with favorited Pokemon
router.get('/', function(req,res) {
    // TODO: render favorites

    db.pokemon.findAll().then(function(reqData){
    // // console.log(data);
      res.render('pokemon/index', {pokemons:reqData});
    });

    // client.connect();

    //   // dataValues:
    //   //  { id: 35,
    //   //    name: 'caterpie',
    //   //    createdAt: 2018-02-18T20:42:49.581Z,
    //   //    updatedAt: 2018-02-18T20:42:49.581Z }

    // client.query('SELECT * FROM pokemons', (err, res) => {
    //   console.log(err ? err.stack : res.rows[0].data);
    //   client.end();
    // })
});

// GET /pokemon/:id
router.get('/:id', function(req,res){
  // TODO: render a list of details for pokemon/id
  // console.log(req.params);
  db.pokemon.find({
    where: {id:req.params.id}
  }).then(function(data){
    // console.log(data);
    res.render('pokemon/details', {pokemon:data});
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req,res) {
    // TODO: add to database
    // console.log(req);
    var pokeToAdd = req.body.name;
    db.pokemon.create({
      name:pokeToAdd
    }).then(function(data){
      res.redirect('/pokemon');
    });
});

// PUT route
router.put('/pokemon/:name', function(req,res){
  console.log("in PUT path.....!");
  console.log(req.params.id);
  db.game.update({
    name:req.body.name
  },{
    where: { id:req.params.id }
  }).then(function(data){
    res.send("success");
  });
});
// DELETE route
router.delete('/delete/:id', function(req,res){
  console.log('in delete path');
  db.user.destroy({
    where: {id:req.params.id}
  }).then(function(data){
    console.log('deleted object');
    // res.redirect('/index');
  });
});

module.exports = router;
