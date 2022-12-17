const express = require('express');
const router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/pokemon', async (req, res) => {
  try {
  // READ function to find all favorited pokemon
  const favePokemon = await db.pokedex.findAll()
  res.render('', {
    favePokemon: favePokemon
  })
  } catch(error){
    console.log(error.message)
  }
  // TODO: Get all records from the DB and render to view
  res.send('Render a page of favorites here')
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  try{

  } catch(error) {
    console.log(error.message)
  }
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

module.exports = router;
