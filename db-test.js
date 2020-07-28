const db = require('./models');

db.Pokemon.create({
  name: 'Pikachu'
}).then(function(poke) {
  console.log('Created: ', poke.name)
})

// db.pokemon.findAll().then(function(poke) {
//   console.log('Found: ', poke.name)
// })