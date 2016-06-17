var db = require('./models');

db.pokemon.create({
  name: 'Pikachu'
}).then(function(newPokemon) {
  //console.log(newPokemon.get());
});

db.pokemon.findAll().then(function(pokemon){
  console.log(pokemon);
});