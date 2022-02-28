
// to represent sequelize
// Make sure to require your models in the files where they will be used.
const db = require('./models');

// CREATE -- A NEW POKEMON
// comes from models folder
db.pokemon.create({
    name: 'pikachu'
  }).then(poke => {
    console.log('Created: ', poke.name)
  })

db.pokemon.findOne({
  where: {
    name: 'pikachu'
  }
}).then(poke => {
  console.log('Found: ', poke.name)
})

// create some pokemon with async/await syntax
async function createPokemon() {
  try {
    const newPokemon = await db.pokemon.create({ name: 'charizard' })
    // console.log to check on 
    console.log('monferno')
    // will wait for this action until created
    console.log('the new pokemon is:', newPokemon)
    // find that new created pokemon
    const foundPokemon = await db.pokemon.findOne({
      where: {
        name: 'charizard'
      }
    })
    console.log('the found pokemon is:', foundPokemon)
  } catch (err) {
    console.log(err)
  }
}

createPokemon()

