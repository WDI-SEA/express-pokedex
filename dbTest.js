var db = require('./models');

db.pokemon.create({
  name: 'Pikachu'
}).then(function(newPokemon) {
  console.log(newPokemon.get());
});
