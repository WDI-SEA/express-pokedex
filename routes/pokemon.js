const express = require('express');
const router = express.Router();
const db = require('../models')

router.get('/pokemon/:name', (req, res) => {
  request('https://pokeapi.co/api/v2/pokemon/' + req.params.name, (err, response, body) => {
      if (err || response.statusCode != 200) {
          res.render('404')
          console.log('errorrrrrrrrrrr' + req.params.name)
      }
      else {
        //  res.send('STUB - poke types list')
        res.render('details', { pokemon: JSON.parse(body.data) })
      }
  })
})

// Routes
router.get('/', (req, res) => {
  db.pokemon.findAll()
  .then(pokemon => {
    res.render('faves', { pokemon })
  })
  .catch(err => {
    console.log(err)
    res.send('An error happened')
  })
})

router.get('/:id', (req, res) => {
  if (parseInt(req.params.id)) {
    db.pokemon.findOne({
      where: { id: req.params.id }//,
      // include: [db.outfit]
    })
    .then(pokemon => {
      res.render('faves', { pokemon })
    })
    .catch(err => {
      console.log(err)
      res.send('An error happened')
    })
  }
  else {
    res.send('Something went wrong')
  }
})


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  //res.send(req.body);
  db.pokemon.create(req.body)
  .then(createdPokemon => {
    res.redirect('/')
  })
  .catch(err => {
    console.log(err)
    res.send('Uh oh sorry')
  })
});


module.exports = router;
