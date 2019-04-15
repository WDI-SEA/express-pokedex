require('dotenv').config()
var express = require('express');
var router = express.Router();
var request = require('request');

// GET /pokemon - return a page with favorited Pokemon
router.get('/pokemon', (req, res) => {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/'
  var pokemon = JSON.parse(body).results;
  res.render('/pokemon', { pokemon: pokemon.slice(0, 151) })
    request(pokemonUrl, function(error, response, body) {
      if (success) {
        var pokemonUrl = process.env.POKEMON_BASE_URL + pokemon.name
        console.log(`pokemonUrl: ${pokemonUrl}`)
        console.log("Success!")
        request(pokemonUrl, function(error, response, body) {
          if(error || response.statusCode != 200) {
            console.log('error', error)
            console.log('status code', response && response.statusCode)
            console.log('body:', body);
            res.send('Oops - check logs')
          } else {
          res.redirect('/pokemon')
        }
      });
    }
  }
})

//POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  db.pokemon.create({
    name: req.body.name
    }).then(function() {
    res.redirect('pokemon')
  });
}

router.get('/:id', (req, res) => {
  db.pokemon.findById(req.params.id).then((pokemon) => {
    request(pokemonUrl, function(error, response, body) {
      if (success) {
        var pokemonUrl = process.env.POKEMON_BASE_URL + pokemon.name
        console.log(`pokemonUrl: ${pokemonUrl}`)
        console.log("Success!")
        request(pokemonUrl, function(error, response, body) {
          if(error || response.statusCode != 200) {
            console.log('error', error)
            console.log('status code', response && response.statusCode)
            console.log('body:', body);
            res.send('Oops - check logs')
          var info = JSON.parse(body)
          res.render('pokemon/show', {info});
        })
      })
    })
  }
}
}

router.delete('/:id', (req, res) => {
  db.pokemon.destroy({
    where: {id:req.params.id}
      }).then(function(){
    res.redirect('/pokemon')
  })
})

module.exports = router;
