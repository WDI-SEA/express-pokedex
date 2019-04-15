
var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.poke.findAll()
  .then((poke)=> {
  		res.render('pokemon/index', { poke });
  })
  .catch((err) => {
  	console.log('err', err)
  	res.send('error dude')
  })
  
});

router.post('/', (req,res)=>{
  console.log(req.body)
  db.poke.create(req.body)
  .then((createPoke)=> {
    res.redirect('/pokemon/' + createPoke.id)
  })
  .catch((err)=> {
    console.log('Error in POST / poke', err)
    res.render('404')
  })
})


router.get('/:id', (req, res) => {
  db.poke.findByPk(req.params.id)

  .then((foundPoke) => {

    //calling the details of the pokemon
    var iChooseUrl = 'http://pokeapi.co/api/v2/pokemon/'+ foundPoke.name + '/';
    console.log(iChooseUrl)
    
    // Use request to call the API
    request(iChooseUrl, function(error, response, body) {
       chosenPokemon = JSON.parse(body);
      console.log("HEY CHOSENPOKE: ",chosenPokemon)
    })


    //leave this
    res.render('pokemon/show', {
      poke: foundPoke,
      poke2: chosenPokemon
    })
  })
  .catch((err)=> {
    console.log('Error in POST / pokes', err)
    res.send('404', err)
  })
})




// // GET / - main index of site
// app.get('/', function(req, res) {
//   var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/bulbasaur/';
//   // Use request to call the API
//   request(pokemonUrl, function(error, response, body) {
//     var pokemon = JSON.parse(body).results;
//     res.render('index', { pokemon: pokemon.slice(0, 151) });
//   });
// });




module.exports = router;
