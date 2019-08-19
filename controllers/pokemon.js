let router = require('express').Router()
let db = require('./models')

router.get('/', (req, res) => {
    db.pokemon.findAll()
    .then(pokemons => {
        res.render('pokemons/index', { pokemons })
    })
    .catch(err => {
        console.log('Oops', err)
        res.send('Something bad happened!')

    })
    
    
  })

// router.get('/:id', (req, res) => {
//     db.pokemon.findOne({
//         where: { id: req.params.id },
//         include: [db.pokemon]
//     })
//     .then(pokemon => {
//         res.render('/show', { pokemon })
//     })
//     .catch(err => {
//         console.log('Oops', err)
//         res.send('Somethingbad happened!')
//     })
// })


router.get('/:id', (req, res) => {
    if (parseInt(req.params.id)) {
        db.pokemon.findByPk(req.params.id)
        .then( foundPoke => {
            let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + foundPoke + '/'
            console.log('pokemonUrl : ', pokemonUrl)
            axios.get(pokemonUrl)
            .then( function(apiResponse){
                var pokemon = apiResponse.data.results;
                console.log('pokemon specs: ', pokemon)
                res.render('pokemon/show', {poke: foundPoke, pokemon: pokemon})
            })
        })
        .catch(err => {
            console.log('Oops', err)
            res.send('Somethingbad happened!')
        })

    } else {
        res.send('A catch error has occurred')
    }
})


module.exports = router