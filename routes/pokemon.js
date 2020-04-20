var express = require('express');
var router = express.Router();
const axios = require('axios'); 
let db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
 
  db.pokemon.findAll()
    .then((pokemon)=>{
        res.render('fave',{pokemon})
      })
      .catch((err)=>{
        console.log('Error',err)
        res.render('error')
      })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {

  db.pokemon.findOne({
    where: {name: req.body.name},
  })
  .then((pokemon)=>{
    if(!pokemon){
      db.pokemon.create(req.body)
      .then()
      .catch((err)=>{
        console.log('Error',err)
        res.render('error')
      })
    } 
    res.redirect('/pokemon')
  })
  .catch((err)=>{
    console.log('Error',err)
    res.render('error')
  })
  
});

router.get('/:id',(req,res)=>{
    let id = req.params.id;
    db.pokemon.findOne({
      where: {id: id},
    })
    .then((pokemon)=>{
        console.log('id',id)
        var pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/'+ pokemon.name+'/';
        console.log('url',pokemonUrl)
        axios.get(pokemonUrl).then( function(apiResponse) {
          var pokemonApi = apiResponse.data;
          console.log('pokemonApi abilities',pokemonApi.abilities[0].ability.name)
          console.log('image url',pokemonApi.sprites.front_default)
          res.render('show', { pokemon: pokemonApi, name:pokemon.name});
        })
        .catch((err)=>{
          console.log('Error',err)
          res.render('error')
        })
    })
    .catch((err)=>{
      console.log('Error',err)
      res.render('error')
    })
})

router.delete('/:id',(req,res)=>{
  db.pokemon.destroy({
    where: {id: req.params.id}
  })
  .then(()=>{
    res.redirect('/pokemon')
  })
  .catch(err=>{
    console.log('error in delete',err)
    res.render('error')
  })
 
})

module.exports = router;
