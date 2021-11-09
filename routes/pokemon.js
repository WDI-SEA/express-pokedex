const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require("axios")

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon
    .findAll()
    .then((faves) => {
      res.render("indexFaves", { results: faves })
    })
    .catch((error) => {
      console.error
    })
  // TODO: Get all records from the DB and render to view
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body))
  console.log("this is data", data)
   db.pokemon
     .create({
       name: data.name
     })
     .then(() => {
       res.redirect('/pokemon')
     })
     .catch(error => {
       console.log(error)
     })
  // TODO: Get form data and add a new record to DB
})

router.get('/:name', function (req, res) {
  let pokeInfo = req.params.name

  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeInfo}`)
  .then((apiRes) => {
    let name = apiRes.data.name 
    let height = apiRes.data.height
    let weight = apiRes.data.weight 
    let base_experience = apiRes.data.base_experience
    let forms = apiRes.data.forms 
    let sprites = apiRes.data.sprites.front_default

    res.render("faveDetail", {
      height: height,
      weight: weight,
      base_experience: base_experience,
      forms: forms,
      name: name,
      sprites: sprites
    })
  })
  .catch((err)=>{
    console.error 
  })
})



module.exports = router;
