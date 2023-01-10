const express = require('express')
const router = express.Router()
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  try {
      const allFaves = await db.pokemon.findAll()
      //console.log('Favorites', allFaves)
      res.render('Favorites' , {pokemons: allFaves})
  } catch (err) {
  console.error('❌❌❌❌', err)
  res.status(500).send('api errorz')
}
})


router.post('/', async (req, res) => {
  // res.send(req.body);
  try {
    const newFave = await db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      }
    })
    //console.log("New favorite:", newFave)
    res.redirect("/pokemon")
  } catch (err) {
    console.error('❌❌❌❌', err)
    res.status(500).send('api errorz')
  }
});

// // GET /:name
router.get('/:name', async (req, res) => {
  try {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokeName}/`
    const pokeName = req.params.name
    const foundData = await axios.get(apiUrl)
    res.render("show", {pokemon: foundData.data})
  } catch (err) {
    console.error('❌❌❌❌', err)
    res.status(500).send('api errorz')
  }
})



module.exports = router;
