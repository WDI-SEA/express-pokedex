const db = require('./models');

db.pokemons.create({
    name: 'pikachu',
    img_url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
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

