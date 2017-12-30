var db = require('./models');

db.favorite.create({
  name: 'Pikachu'
}).then(function(poke) {
  console.log('created', poke.name);
});