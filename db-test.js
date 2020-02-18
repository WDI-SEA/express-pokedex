// Make sure to require your models in the files where they will be used.
var db = require('./models');

db.pokemon.create({
  name: 'Pikachu',
  url: 'https://pokeapi.co/api/v2/pokemon-form/25/'
}).then(function(poke) {
  console.log('Created: ', poke.name)
})

db.pokemon.findAll().then(function(poke) {
  console.log('Found: ', poke.name)
})