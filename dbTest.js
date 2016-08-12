var db = require('./models');

db.favoritePokemon.create({
  name: 'Pikachu'
}).then(function(newPokemon) {
  console.log(newPokemon.get());
});