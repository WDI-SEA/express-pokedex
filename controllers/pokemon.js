const express = require('express');
const router = express.Router();
const db = require("./models")
// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  let allFavePokemon = await db.pokemon.findAll()
  console.log(allFavePokemon)
  res.send('Render a page of favorites here');
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

module.exports = router;