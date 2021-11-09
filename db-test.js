// // // Make sure to require your models in the files where they will be used.
const db = require('./models');

db.pokemon.create({
    id: "6",
    name: 'bulbasaur',
    isFavorite: false
  }).then(poke => {
    console.log('Created: ', poke.name)
  })

// db.pokemon.findOne({
//   where: {
//     isFavorite: false
//   }
// }).then(poke => {
//   console.log('Found: ', poke.name)
// })
