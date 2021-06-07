const db = require('./models');

db.Pokemon.create({
    name: 'charizard'
  }).then(poke => {
    console.log('Created: ', poke.name)
    db.Pokemon.findOne({
        where: {
          name: poke.name
        }
      }).then(pokeFound => {
        console.log('Found: ', pokeFound.name)
      })
  })

