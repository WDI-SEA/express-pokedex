var db = require('./models');

db.pokemon.create({
  name: 'Pikachu'
}).then(function(poke) {
  console.log('created', poke.name);
});