var db = require('./models');

db.favorite.create({
  name: 'Venusaur'
}).then(function(newPokemon) {
  console.log(newPokemon.get());
});
