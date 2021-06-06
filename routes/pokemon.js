const express = require('express');
const router = express.Router();
let db = require('../models')
const axios = require('axios'); 



// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  
  // TODO: Get all records from the DB and render to view
  async function findPokemon() {
    try{
      const findPoke = await db.pokemon.findAll()
      // res.send(findPoke)
      res.render('favorites', {pokemon:findPoke})
      
    }catch(error) {
      console.log(error)
    }
      }
      findPokemon()

})


  // //res.render (view, data to add to view)
  // res.render('index', {pokemon:pokemon})
  // console.log(req.body.name)



// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // console.log(req.body.name)
  const favPokemon = req.body.name
  async function findOrCreatePokemon(){
    try {

      // the findOrCreate promise returns an array with two elements,
      // so 'array destructuring' is used to assign the names to the elements

      const [pokemon, created] = await db.pokemon.findOrCreate({
        // where is used search for values in columns
        where: {
          name: favPokemon
        }
          })
      console.log(`${pokemon.name} was ${created ? 'created' : 'found'}`)
    } catch (error) {
      console.log(error)
    }
  }
  findOrCreatePokemon()
})
  





//Show details when clicking on Pokemon
 ///:name
 router.get('/:name', (req,res) => {
  let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${req.params.name}/`;


  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data;
    //passing in an object: Key:          Value
    // if key and vaule are the same, just pass in one word
    res.render('details', {pokemon:pokemon});
  })
 })




// res.send(req.body);

// TODO: Remove pokemon from DB


router.delete('/:name', (req, res) => {
  let removePkmn = req.params.name
  
  req.params.name
  async function removePokemon() {
    try {
      await db.pokemon.destroy({
        where: { 
          name:  removePkmn
        }
      })
      
    } catch (error) {
      console.log(error)
    }
    // const allRemainingPkmn = await db.pokemon.findAll()
    // for (const pokemon of allRemainingPkmn){
    //   console.log(pokemon.name)
    // }
  }
  removePokemon()
  
  res.redirect('/pokemon')
  
  
  
})



// async function removePokemon(){
//   try{
//     console.log(db.pokemon)
//     const pkmnRem = await db.pokemon.destroy({
//       where: {
//         name: removePkmn
//       }
//     })


//   }catch(error){
//     console.log(error)
//   }
//   console.log("delete funct")
// }
module.exports = router;
