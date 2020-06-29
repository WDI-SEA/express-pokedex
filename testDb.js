var db = require('./models')

const errorHandler = error => {
    console.log(`🌙`)
    console.log(error)
}

db.pokemon.create({
    name: 'Pikachu'
}).then((poke) => {
    console.log('Created', poke.name)
})

db.pokemon.findAll().then((poke) => {
    console.log('Found', poke.name)
})