var db = require('./models');

// db.pokemon.create({
//   name: 'Pikachu'
// }).then(function(poke) {
//   console.log('Created: ', poke.name)
// })

db.pokemon.findAll().then(function(pokemons) {
    pokemons.forEach(pokemon => console.log('Found: ', pokemon.name));
})