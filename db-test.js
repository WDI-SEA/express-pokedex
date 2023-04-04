// Make sure to require your models in the files where they will be used.
const db = require('./models');

db.pokemon.create({
    name: 'pikachu'
   })
   .then(poke => {
     console.log('Created: ', poke.name)
     db.pokemon.findOne({
         where: {
           name: 'pikachu'
         }
       })
       .then(poke => {
         console.log('Found: ', poke.name)
       })
       .catch(console.log)
   })
   .catch(console.log)

// create some pokemon with async/await syntax
async function createPokemon() {
  try {
    const newPokemon = await db.pokemon.create({ name: 'charizard' })
    console.log('the new pokemon is:', newPokemon)
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