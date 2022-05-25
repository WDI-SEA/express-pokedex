const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  const allFaves = await db.pokemon.findAll()
  res.render('pokemon/index.ejs', {allFaves})
  // res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  await db.pokemon.findOrCreate ({
    where: {
      name: req.body.name
    },
    defaults: {
      name: req.body.name
    }
  })
  res.redirect('/pokemon')
});

// get for specific pokemon
router.get('/:name', async (req, res) => {
  try {
    const pokeURL = `https://pokeapi.co/api/v2/pokemon/${req.params.name}`
    const pokemon = await axios.get(pokeURL)
      res.render('show.ejs', {
        name: req.body.name,
        pokemon: pokemon.data
      })


  } catch (err) {
    console.log('error', err)
  }
})
 
router.delete('/:name', async (req,res) => {
   try {
     const deletion = await db.pokemon.findOne( {
       where: {
         name: req.params.name
       }
     })
     await deletion.destroy()
     res.redirect('/pokemon')
   } catch(err) {
     console.warn(err)
   }
})


// async function to delete

module.exports = router;
