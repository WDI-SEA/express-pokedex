var db = require('./models');

db.pokemon.create({
  name: 'bulbasaur'
}).then(function(poke) {
  console.log('Created: ', poke.name)
})

db.pokemon.findAll().then(function(poke) {
  console.log('Found: ', poke.name)
})