// Make sure to require your models in the files where they will be used.
const db = require('./models');

// db.pokemon.create({
//     name: 'MewTwo'
//   }).then(poke => {
//     console.log('Created: ', poke.name)
//   })

// db.pokemon.findOne({
//   where: {
//     name: 'MewTwo'
//   }
// }).then(poke => {
//   console.log('Found: ', poke.name)
// })

// create some pokemon with async/await syntax
// async function createPokemon() {
//   try {
//     const newPokemon = await db.pokemon.create({ name: 'MewTwo' })
//     console.log('the new pokemon is:', newPokemon)
//     const foundPokemon = await db.pokemon.findOne({
//       where: {
//         name: 'MewTwo'
//       }
//     })
//     console.log('the found pokemon is:', foundPokemon)
//   } catch (err) {
//     console.log(err)
//   }
// }


// createPokemon()

// Find all users
 seeTable = async ()=>{const users = await db.pokemon.findAll();
console.log(users.every(user => user instanceof name))} // true
 
seeTable()