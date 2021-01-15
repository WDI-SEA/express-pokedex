const db = require('./models');

db.pokefav.create({
    name: 'pikachu'
  }).then(poke => {
    console.log('Created: ', poke.name)
  })

db.pokefav.findOne({
  where: {
    name: 'pikachu'
  }
}).then(poke => {
  console.log('Found: ', poke.name)
})