// Make sure to require your models in the files where they will be used.
const db = require('./models');

// db.pokedex.create({
//     pokemon: 'pikachu'
//   }).then(poke => {
//     console.log('Created: ', poke.pokemon)
//   })

db.pokedex.findOne({
  where: {
    pokemon: 'pikachu'
  }
}).then(poke => {
  console.log('Found: ', poke.pokemon)
})