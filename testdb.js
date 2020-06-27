var db = require('./models')

db.pokemon.findOrCreate({
    where: {
        name: 'Geodude'
    }
}).then(([pokemon, created]) => {
    console.log(`${pokemon.name} added to favorites.`)
})

// db.pokemon.findOne({
//     where: {
//         name: 'Charizard'
//     }
// }).then(pokemon => {
//     console.log(`${pokemon.name} found.`)
// })