const db = require('./models');

// db.pokemon.create({
//     name: 'pikachu'
//   }).then(poke => {
//     console.log('Created: ', poke.name)
//   })

// db.pokemon.findOne({
//   where: {
//     name: 'pikachu'
//   }
// }).then(poke => {
//   console.log('Found: ', poke.name)
// })


db.pokemon.findAll()
.then(dbmonster => {
  console.log(dbmonster.names)
})