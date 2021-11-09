const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 


router.delete("/:name", (req, res) => {
  // console.log("this is the id\n", req.params.id)
  db.pokemon.destroy({
      where: { name: req.params.name }
  })
  .then(deletedItem => {
      // Destroy returns "1" if smting is deleted and "0" if nothing deleted
      // console.log("you deleted: ", deletedItem)
      res.redirect("/pokemon")
  })
  .catch(error => {
      console.error
  })
})
// GET /pokemon - return a page with favorited Pokemon
router.get("/", (req, res) => {
  db.pokemon.findAll()
  .then(faves => {
      res.render("indexFaves", {results: faves})
  })
  .catch(error => {
      console.log(error)
  })
})


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post("/", (req, res) => {
  //"JSON.parse is being called on JSON.stringify which is calling our req.body" This allows us to format it in a way that sequelize can use
  const data = JSON.parse(JSON.stringify(req.body))
  console.log("this is data", data)
  db.pokemon.create({
      name: data.name
  })
  .then(createdFave => {
      res.redirect("/pokemon")
  })
  .catch(error => {
      console.log(error)
      //can also use console.error
  })

})




router.get('/:name', (req,res)=> {
  let pokemonInfo = req.params.name
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonInfo}/`)
    .then(apiRes => {
      console.log('this is apiRES.data', apiRes.data)
      let pokemonBase = apiRes.data.stats[0].base_stat
      let pokemonName = apiRes.data.name
      let pokemonImage = apiRes.data.sprites.front_default
      let pokemonType = apiRes.data.types[0].type.name
      let pokemonMoves = apiRes.data.moves[0].move.name

      res.render('detail', {pokemonBase, pokemonName, pokemonImage, pokemonType, pokemonMoves})
    })
    .catch(error => {
      console.log(error)
    })
})





module.exports = router;
