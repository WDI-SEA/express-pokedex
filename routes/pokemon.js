var router = require('express').Router();
var db = require('../models');
let axios = require('axios'); 
let methodOverride = require('method-override')

router.use(require('morgan')('dev'));
router.use(methodOverride('_method'))


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
    if (parseInt(req.params.id)) {
        db.pokemon.findByPk(req.params.id)
        .then(foundPoke => {
            let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + foundPoke.name + '/'
            console.log('pokemonUrl : ', pokemonUrl)
            axios.get(pokemonUrl)
            .then( (apiResponse) => {
                var pokemon = apiResponse.data;
                console.log('pokemon specs: ', pokemon)
                res.render('pokemon/show', { poke: foundPoke, pokemon: pokemon })
            })
            
        })
        .catch(err => {
            res.send('An error has occurred')
        })
    } else {
        res.send('An error has occurred')
    }
})

router.post('/', (req, res) => {
    db.pokemon.create(req.body)
    .then(addedPoke => {
        res.redirect('/pokemon')
    })
    .catch(err => {
        console.log(err)
        res.send('No Go!')
    })
})

router.delete('/', (req, res) => {
    console.log('Delete initiated')
    db.pokemon.destroy( {
        where: req.body
    })
    .then((deletedPoke) => {
        console.log(deletedPoke.name, 'has been deleted.')
        res.redirect('/pokemon')
    })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

module.exports = router;
