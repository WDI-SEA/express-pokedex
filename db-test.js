const db = require('./models');

db.fave_pokemon.create({
  species: 'Charmander',
})
.then(poke => {
  console.log('Created: ', poke.species);
})
.catch(err => {
  console.log("Error: ", err);
});

db.fave_pokemon.create({
  species: 'Pikachu',
})
.then(poke => {
  console.log('Created: ', poke.species);
})
.catch(err => {
  console.log("Error: ", err);
});

db.fave_pokemon.create({
  species: 'Snorlax',
})
.then(poke => {
  console.log('Created: ', poke.species);
})
.catch(err => {
  console.log("Error: ", err);
});