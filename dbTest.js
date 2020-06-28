var db = require('./models');

// db.pokemon.create({
//   name: 'charmander'
// }).then(function(poke) {
//   console.log('Created: ', poke.name)
// })

// db.pokemon.findAll().then(function(poke) {
//   console.log('Found: ', poke.name)
// })

db.pokemon.findAll().then(favorite => {
    console.log(favorite)
}).catch(err => {
    console.log(err)
})