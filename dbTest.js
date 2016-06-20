var db = require('./models');

// db.pokemon.create({
//   name: 'Pikachu'
// }).then(function(newPokemon) {
//   console.log(newPokemon.get());
// });

db.pokemon.findAll({
}).then(function(pokemons) {
  // console.log(pokemons.name);
  //iterate over array object
  pokemons.forEach(function(pokemon) {
    console.log(pokemon);
  })
})
