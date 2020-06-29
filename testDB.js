var db = require('./models');

db.pokemon.create({
  name: 'Celebi'
}).then((newPokemon) => {
  console.log('You just created: ', newPokemon.name)
})

db.pokemon.findAll().then((pokemons) => {
  pokemons.forEach(pokemon => console.log(`Hey there ${pokemon.name}!` ));
}).catch((error) => {
  console.log(error)
})
