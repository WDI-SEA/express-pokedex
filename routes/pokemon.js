let express = require('express');
let router = express.Router();
let db = require('../models')
let request = require('request')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll()
  .then(pokemon => {
    res.render('pokemon', {pokemon})
  })
  .catch(err => {
    console.log('Err', err)
    res.render('error')
})
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
     db.pokemon.create(req.body)
      .then(newPoke => {
        res.redirect('/pokemon')
      })
      .catch(err => {
        console.log('Err', err)
        res.send('error')
      })
  })

//GET /pokemon/:id - renders show page with selected pokemon
router.get('/:id', (req, res) => {

  // db.pokemon.findOne({
  //   where: {name: req.params.id}
  // }).then(poke => {
    let poke = req.params.id
    
    request('http://pokeapi.co/api/v2/pokemon/' + req.params.id, (error, response, body) => {
      if(error) { 
        console.log('error', error) 
      } else { 
        let data = JSON.parse(body)
        
        res.render('pokemon/show', {poke, data})
      }
    }) 
  })
// } else {
  
//   request('http://pokeapi.co/api/v2/pokemon/' + req.params.id, (error, response, body) => {
//     if(error) { 
//       console.log('error', error) 
//     } else { 
//       let data = JSON.parse(body) 
//       res.render('pokemon/show', {poke, data})
//     }
//   }) 
// // }
// })



router.delete('/:id', (req, res) => {

  db.pokemon.destroy({where: {id: req.params.id}}).then((poke) => { 
    
    console.log(`deleted ${poke.name}`)
    res.redirect('/pokemon')
})
})


module.exports = router;
