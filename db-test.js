var db = require('./models');



db.pokemon.findAll().then(function(poke) {
  console.log('Found: ', poke.name)
})