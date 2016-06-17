var db = require('./models');

// db.pokemon.create({
//   name: 'Charizard'
// }).then(function(newPokemon) {
//   console.log(newPokemon.get());
// });


//DELETE Pikachu
db.pokemon.destroy({
  where: {
  name: 'Pikachu'
  }
}).then(function(newPokemon) {
  console.log(newPokemon);
})
