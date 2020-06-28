var db = require('./models');
const errorHandler = error => {
  console.log('🔥🔥🔥🔥🔥🔥')
  console.log(error)
}

// db.pokemon.findOrCreate({
//   where: {
//     name: 'Pikachu'
//   }
// }).then(([pokemon, created]) => {
//   console.log(`🐶 ${pokemon.name} was ${created ? 'created👍' : 'found🔎'}`)
  
// }).catch(errorHandler)

db.pokemon.findAll().then(function(poke) {
  console.log('Found: ', poke.name)
})

