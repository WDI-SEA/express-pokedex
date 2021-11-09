// Make sure to require your models in the files where they will be used.
const db = require('./models')

db.pokemons.create({
    name: 'pikachu'
  }).then(poke => {
    console.log('Created: ', poke.name)
  })

db.pokemons.findOne({
  where: {
    name: 'pikachu'
  }
}).then(poke => {
  console.log('Found: ', poke.name)
})
