const db = require('./models')

// CREATE - creates 1 record in specified table of db (db.[Table Name])
db.pokemon.create({
    name: 'Squirtle',
    type: 'Water'
}).then(function(poke) {
    console.log(`🌊 Created: ${poke.name} which is a ${poke.type} type! 🌊`)
}).catch(errorHandler)


// READ - finds all records in specified table of db (db.[Table Name])
db.pokemon.findAll().then(function(poke) {
    console.log('Found: ', poke.name. poke.type)
})
