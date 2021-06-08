const db = require('./models')

db.Pokemon.create({
    name: 'pikachu'
}).then(poke => {
    console.log('Created: ', poke.name)
    db.Pokemon.findOne({
        where: {
            name: 'pikachu'
        }
    }).then(pokeFound => {
        console.log('Found: ', pokeFound.name)
    })
})    