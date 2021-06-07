const express = require('express');
const router = express.Router();
let db = require('../models')
const axios = require('axios')

router.get('/:id', (req, res) => {
  //get the name of the pokemon assiociated with this id from our db
    //get name from req.query
    let name = req.query.name
  //get extra information for pokemon at id
  axios.get(`http://pokeapi.co/api/v2/pokemon/${name}`)
  .then((apiRes) => {
    let imgSrc = apiRes.data.sprites.front_default
    let pokeId = apiRes.data.id        
    let types = apiRes.data.types[0].type.name
    
    res.render('pokemon/show', {src: imgSrc, id: pokeId, type: types})
  })
  .catch(err => console.log(err))
    //info we want to get: pokeAPI Id, pokeAPI char image, types
  //render a page with pokemon details passed back from APIcall

})

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(result => {
    res.render('pokemon/index.ejs', { pokemons: result })
  })
  .catch(err => {
    console.log('oh baby we got an error over here😬')
  })
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to db
  let name = req.body.name
  db.pokemon.findOrCreate({
    where: {
      name: name
    }})
    .then((data) => {
      res.redirect('/pokemon')
    })
    .catch((err) => {
      console.log(`houston, we found an ${err}`)
    })
});

// GET /pokemon - return a page with favorited Pokemon
router.get('/:name', (req, res) => {
  // TODO: Get all records from the DB and render to view
  let pokeName = req.params.name
  let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${pokeName}`
  // Use request to call the API
  axios.get(`${pokemonUrl}${pokeName}`)
  .then(apiResponse => {
    let pokemon = apiResponse.data;
    res.render('pokemon/index.ejs', {pokemon: pokemon})
  })
});


//DELETE
router.delete('/:name', (req, res) => {
  let pokeName = req.params.name
  db.pokemon.destroy({
    where: {
      name: pokeName
    }
  })
  .then(response => {
    res.redirect('/pokemon')
  })
  
})


module.exports = router;
module.exports = router;


//POST details  
// router.get('/:name', (req, res) => {
//   let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon'
//   axios.get(pokemonUrl).then(apiResponse => {
//     let pokemon = apiResponse.data.results;
//     res.render('favorite', { pokemon: pokemons });// if you want more options of pokemon 
//   })
// })

// let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`;
              // Use request to call the API
// axios.get(pokemonUrl).then(apiResponse => {
//   let pokemon = apiResponse.data.results;
//   res.render('index', { pokemon: pokemon.slice(0, 151) });// if you want more options of pokemon 
// })
//<img class="detail-img" src="<%= pokemon.sprites.front_default %>"/>
//<img class="detail-img" src="<%= pokemon.sprites.front_default %>"/>
//let name = req.body.name
//db.pokemon.findOrCreate({ where: { name.name }}).then((data) => { })
//  async function favoritePokemon() {
//   let [pokemon, created] = await db.pokemon.findOrCreate({
//     where: {
//       name: req.body.name
//     } 
//   })
//   res.redirect('/pokemon');
// }
// favoritePokemon()
// console.log(req.body)