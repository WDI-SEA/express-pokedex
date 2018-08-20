// Make sure to require your models in the files where they will be used.
var db = require('../models');

db.poke.create({
  name: 'Pikachu'
}).then(function(poke) {
  console.log('Created: ', poke.name);
});

db.poke.findAll().then(function(poke) {
  console.log('Found: ', poke.name)
});