// Make sure to require your models in the files where they will be used.
const db = require('./models');


db.pokemon.create({
    name: 'charizard'
  }).then(poke => {
    console.log('Created: ', poke.name)
    db.pokemon.findOne({
      where: {
        name: poke.name
      }
  }).then(pokeFound => {
  console.log('Found: ', pokeFound.name)
  })  
})
