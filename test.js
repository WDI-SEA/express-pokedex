var db = require('./models');


//-----FAVORITE POKEMON DATABASE-------

//CREATE A POKEMON IN DATABASE

// db.pokemon.create({
//     name: 'Bulbasaur'
// }).then(function(poke) {
//     console.log(`Created: ${poke.name}`)
// })


//FIND ALL POKEMON IN DATABASE

// db.pokemon.findAll().then(function(poke) {
//     console.log(`🐶🐶🐶🐶🐶🐶🐶🐶`)
//     poke.forEach(pokemon => console.log(pokemon.name))
// })


//FIND OR CREATE A POKEMON IN DATABASE

// db.pokemon.findOrCreate({
//     where: {
//         name: 'Bulbasaur'
//     }
// }).then(([pokemon, created]) => {
//     console.log(`🐶🐶🐶🐶🐶🐶🐶🐶`);
//     console.log(`${pokemon.name} was ${created ? 'created' : 'found'}!`)
// })

// db.user.findOrCreate({
//     where: {
//         firstName: 'Brian',
//         lastName: 'Hague',
//         email: 'b.hague@ga.co'
//     },
//     defaults: {
//         firstName: 'Brian',
//         lastName: 'Hague',
//         age: 99
//     }
// }).then(([user, created]) => {
//     console.log(`🌎 ${user.firstName} was ${created ? 'created' : 'found'}!`)
// }).catch(errorHandler)

//spread functionality
// const [hello, there] = ['hey hey', 'Spain']
// console.log(hello)
// db.user.findAll().then(users => {
//     users.forEach(user => console.log(`💅🏼 Hey there ${user.firstName}!`))
// }).catch(errorHandler);