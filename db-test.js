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

// createPokemon()

// //---CREATE POKEMON FUNCTION---
// async function createPokemon(nameInput) {
//     try{
//         let findPokemon = await db.pokedex.findOrCreate({
//             where: {
//                 name: nameInput,
//             }
//         })
//         console.log(findPokemon)
//     } catch(error) {
//         console.log(error.message)
//     }
// }
// // createPokemon()

// //---READ--- returns aray of pokemon
// async function getAllPokemon() {
//     try{
//         const allPokemon = await db.pokedex.findAll()
//     } catch(error) {
//         console.log(error.message)
//     }
// }
// // getAllPokemon()

// //---UPDATE--- update pokemon
// async function updatePokemon(idInput,nameInput) {
//     try{
//         const updatedPokemon = await db.pokedex.update(
//             {name: nameInput},
//             {
//                 where: {
//                     id: idInput,
//                 }
//         })
//     }catch(error) {
//         console.log(error.message)
//     }
// }
// // updatePokemon()

// //---DELETE--- delete a pokemon
// async function deletePokemon(idInput) {
//     try{
//         let deletedPokemon = await db.pokedex.destroy({
//             where: {
//                 id: idInput,
//             }
//         })
//     }catch(error){
//         console.log(error.message)
//     }
// }
// // deletePokemon()

