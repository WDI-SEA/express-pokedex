var db = require('./models');

query = {
  pokemon: 'Bulbasoar'
}


db.pokemon.create(query)
  .then(function(newPoke) {
    console.log(newPoke.get());
  })
