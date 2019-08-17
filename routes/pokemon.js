var router = require('express').Router();
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
    db.pokemon.findAll()
    .then(pokemons => {
        res.render('pokemon/index', { pokemons })
    })
    .catch(err => {
        console.log('Oops', err)
        res.send('Something has happened, again')
    })
});

// GET /pokemon/:id to see indiviudal pokemons
router.get('/:id', (req, res) => {
    console.log("Testing show")
    if (parseInt(req.params.id)) {
        db.pokemon.findByPk(req.params.id)
        .then(foundPoke => {
            res.render('pokemon/show', { foundPoke })
        })
        .catch(err => {
            res.send('An error has occurred')
        })
    } else {
        res.send('An error has occurred')
    }
})

router.get('/pokemon/new'), (req, res) => {
    res.send('HI')
}



// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

module.exports = router;
