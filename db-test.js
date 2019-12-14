const db = require('./models')


// db.pokemon.create({
//     name: 'Pikachu'
//   }).then(function(poke) {
//     console.log('Created: ', poke.name)
//   })
  
  db.pokemon.findAll()
  .then(poke => {
    console.log(poke)
  })