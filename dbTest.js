var db = require('./models');

// db.pokemon.create({
//   name: 'Pikachu'
// }).then(function(poke) {
//   console.log('Created: ', poke.name)
// })

db.pokemon.findAll().then(function(pokes) {
    pokes.forEach(poke => {
        console.log('Found: ', poke.name)
    });
})