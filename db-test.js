const db = require('./models');

db.pokemon.create({
    name: 'pikachu',
    img_url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  }).then(poke => {
    console.log('Created: ', poke.name)
    db.pokemon.findOne({
      where: {
        name: poke.name;
      }
    }).then(pokeFound => {
      console.log('Found: ', pokeFound.name)
    })
  })
