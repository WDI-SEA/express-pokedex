// Make sure to require your models in the files where they will be used.
const db = require('./models');

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