var db = require('./models');

// db.pokemon.create({
//   pokeName: 'Pikachu'
// }).then(function(newPokemon) {
//   console.log(newPokemon.get());
// });

// find 1 row by primary key
db.pokemon.findById(2).then(function(pokemon) {
  console.log(pokemon.get());
});

// // Find or Create
// db.user.findOrCreate({
//   where: {
//     pokeName: "Pikachu"
//   },
//   defaults: {
//     lastName: "Parker"
//   }
// }).spread(function(user, created) {
//   console.log(created);
//   console.log(user.get());
// });
