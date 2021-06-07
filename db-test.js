const db = require('./models');

db.pokemon.create({
    name: 'charizard'
  }).then(poke => {
    console.log('Created: ', poke.name)
    db.pokemon.findOne({
      where: {
        name: 'charizard'
      }
    }).then(pokeFound => {
      console.log('Found: ', pokeFound.name)
    })
  })

