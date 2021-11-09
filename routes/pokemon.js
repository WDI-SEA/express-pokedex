const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
    .then(faves => {
      res.render('indexFaves', {results: faves})
    })
    .catch(error => {
      console.log(error);
    })
  //res.send('Render a page of favorites here');
});
router.get('/:name', function(req,res) {

  //we used this console log, to check out our request object
  //console.log('this is req', req.query);
  let name = req.params.name
  // console.log('this should be the movie title', imdbId);
  axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(apiRes => {
      //console.log('this is apiRes.data', apiRes.data);
          let name = apiRes.data.name
          let height = apiRes.data.height
          let weight = apiRes.data.weight
          //let abilities = apiRes.data.abilities[2].ability.name
          let pokemonImage = apiRes.data.sprites.front_default
  
          //res.render results to reults.ejs with our selected data sent as an object
          res.render('faveDetail', {name: name,
            weight: weight, 
            height: height,
            pokemonImage: pokemonImage
            })
      })
      .catch(err => {
          console.log(err);
      })
  
  })

router.get('/:name', (req,res) => {
  db.pokemon.findOne({
    where: {name: req.params.name}
  })
  .then(foundFave => {
    //let abilities = foundFave.data.abilities
    res.render('faveDetail', {name: foundFave.name,
      abilities: foundFave.ability,
      weight: foundFave.weight, 
      height: foundFave.height
      })
  })
  .catch(error => {
    console.log(error);
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  const data = JSON.parse(JSON.stringify(req.body))
  db.pokemon.create({
    name: data.name,
  })
  .then(createFave => {
    res.redirect(`/pokemon/${createFave.name}`)
  })
  .catch(error => {
    console.log(error);
  })
  .finally(createdPokeFave => {
    console.log(createdPokeFave);
  })
});


  




module.exports = router;
