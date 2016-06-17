var db = require('./models');

// db is the sequelize connection
// pokemon is our table name
db.pokemon.create({
  name: 'Pikachu'
}).then(function(newPokemon) {
  console.log(newPokemon.get());
});
