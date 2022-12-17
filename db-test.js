// Make sure to require your models in the files where they will be used.
const db = require('./models');


// ---GET /pokemon 
app.get('/pokemon', async (req,res) => {
    try{

    } catch(error){
        console.log('Errrrrror',error)
        res.status(500).send('api error :(')
    }
})

//---CREATE POKEMON FUNCTION---
async function createPokemon(nameInput) {
    try{
        let findPokemon = await db.pokemon.findOrCreate({
            where: {
                name: nameInput,
            }
        })
        console.log(findPokemon)
    } catch(error) {
        console.log(error.message)
    }
}
// createPokemon()

//---READ--- returns aray of pokemon
async function getAllPokemon() {
    try{
        const allPokemon = await db.pokemon.findAll()
    } catch(error) {
        console.log(error.message)
    }
}
// getAllPokemon()

//---UPDATE--- update pokemon
async function updatePokemon(idInput,nameInput) {
    try{
        const updatedPokemon = await db.pokemon.update(
            {name: nameInput},
            {
                where: {
                    id: idInput,
                }
        })
    }catch(error) {
        console.log(error.message)
    }
}
// updatePokemon()

//---DELETE--- delete a pokemon
async function deletePokemon(idInput) {
    try{
        let deletedPokemon = await db.pokemon.destroy({
            where: {
                id: idInput,
            }
        })
    }catch(error){
        console.log(error.message)
    }
}
// deletePokemon()