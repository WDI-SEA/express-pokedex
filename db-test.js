var db = require('./models');

db.pokemon.create({
    name: 'Pikachu'
}).then(function(poke) {
    console.log('created', poke.name);
});

console.log('------------');

db.pokemon.findOne({
    where: { name: 'Pikachu' }
}).then(function(poke) {
    console.log('found', poke.name);
});
