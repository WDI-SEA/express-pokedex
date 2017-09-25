var db = require('./models');
db.pokemon.create({
  name: 'Pikachu'
}).then(function(poke){
  console.log('created', poke.name);
});

db.pokemon.findAll({
  where:{
    name: 'Pikachu'
  }
}).then(function(pokes){
  pokes.forEach(function(poke){
    console.log('found', poke.name);
  })
});
