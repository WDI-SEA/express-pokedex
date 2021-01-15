const express = require('express');
const router = express.Router();
const db = require('../models')

router.get('/', (req, res) => {
  db.pokedex.findAll()
  .then(pokemon => {
    res.render('pokemon/index', {pokemon})
  }).catch(error => {
    console.log(error)
  })
})


// // POST /pokemon - receive the name of a pokemon and add it to the database
// router.post('/', function(req, res) {
//   // TODO: Get form data and add a new record to DB

//   res.send(req.body);
// });

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokedex.findOrCreate ({
    where: {pokemon: req.body.name}
  }).then(pokemon => {
    res.redirect('/')
  })
  // res.send(req.body);
});

module.exports = router;
