var db = require('./models');

db.pokemon.create({
  name: 'pikachu',
  nickname: 'Pi-pika',
  level: 999
}).then(function(poke) {
  console.log('Created: ', poke.name)
})

db.pokemon.findAll().then(function(pokemons) {
    pokemons.forEach(pokemon => console.log('Found: ', pokemon.name));
})