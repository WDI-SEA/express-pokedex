var db = require('./models');

db.pokemon.create({
    name: 'pikachu'
}).then(function(poke) {
    console.log('created', poke.name);
});

console.log('------------');

db.pokemon.findOne({
    where: { name: 'pikachu' }
}).then(function(poke) {
    console.log('found', poke.name);
});
