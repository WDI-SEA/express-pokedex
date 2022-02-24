const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require("../models");




router.get('/:name',(req, res)=>{
  let name = req.query.name
  console.log(name)
  axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  .then((apiResponse)=>{
    let pokemon = apiResponse.data;
    res.render('show.ejs', {pokemon: pokemon})
  })
})


// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  res.send('Render a page of favorites here');
});
router.get("/", (req, res) => {
  db.pokemon.findAll();
  .then (pokes =>{
    res.render("/", { pokemon: pokeFaves });
  })
    
  } catch (err) {
    // console.log(err);
  }
});
// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  try{
    let poke = req.body.name
    const checkAndAdd = await db.pokemon.findOrCreate({ 
      where: {
        name: poke
      },
    })

      res.redirect('/pokemon')
  }catch(error){
    // console.log(error)
  }
});

module.exports = router;
