// Make sure to require your models in the files where they will be used.
var db = require('./models');

db.pokeman.create({
  name: 'Bulbasaur'
}).then(function(poke) {
  console.log('Created: ', poke.name);
});

db.pokeman.findAll().then(function(poke) {
  console.log('Found: ', poke.name)
});