const express = require('express');
const db = require('../models');
const router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
    .then(favs => {
      res.render('index', {pokemon: favs})
    })
    .catch(error => {
      console.error
    })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
// TODO: Get form data and add a new record to DB
const data = JSON.parse(JSON.stringify(req.body))
// console.log('this is data', data)
db.pokemon.create({
    name: data.name,
})
.then(createdFav => {
  console.log('db instance created: \n', createdFav)
  res.redirect(`/pokemon`)
})
.catch(error => {
  console.error
})
});

// router.post('/pokemon', (req, res) => {
//    // TODO: Get form data and add a new record to DB
//   const data = JSON.parse(JSON.stringify(req.body))
//   console.log('this is data', data)
//   db.favorite.create({
//       title: data.title,
//       imdbId: data.imdbId
//   })
//   .then(createdFav => {
//       console.log('db instance created: \n', createdFav)
//       res.redirect(`/favs/${createdFav.id}`)
//   })
//   .catch(error => {
//       console.error
//       //also can just console.log(error)
//   })
// })

module.exports = router;
