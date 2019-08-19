
let request = require('request');
var express = require('express');
var router = express.Router();
// require('dotenv').config();
// // const express = require('express');
const axios = require('axios'); 
// const ejsLayouts = require('express-ejs-layouts');
// // const app = express();
// const port = process.env.PORT || 3000;
var db = require('../models');

// app.use(require('morgan')('dev'));
// app.set('view engine', 'ejs');
// app.use(express.urlencoded({ extended: false }));
// app.use(ejsLayouts);

// // GET /pokemon - return a page with favorited Pokemon
// router.get('/', function(req, res) {
//   // TODO: Get all records from the DB and render to view
//   res.render('show')   //res.send('Render a page of favorites here');
// });

// router.get('/:id', (req, res) => {
//   if (parseInt(req.params.id)) {
//       db.pokemon.findByPk(req.params.id)
//       console.log('finkbypk result' + db.pokemon.findByPk(req.params.id))
//       .then( foundPoke => {
//           let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + foundPoke + '/'
//           console.log('pokemonUrl : ', pokemonUrl)
//           console.log('foundPoke' + foundPoke)
//           axios.get(pokemonUrl)
//           .then( function(apiResponse){
//               var pokemon = apiResponse.data.results;
//               console.log('pokemon specs: ', pokemon)
//               res.render('pokemon/show', {poke: foundPoke, pokemon: pokemon})
//           })
//       })
//       .catch(err => {
//           console.log('Oops', err)
//           res.send('Somethingbad happened!')
//       })

//   } else {
//       res.send('A catch error has occurred')
//   }
// })

//GET /pokemom/creatures/name
router.get('/creatures/:name', (req, res) => {
  request('https://pokeapi.co/api/v2/pokemon/' + req.params.name, (err, response, body) => {
      if (err || response.statusCode != 200) {
          res.render('404')
          console.log('errorrrrrrrrrrr' + req.params.name)
      }
      else {
        //  res.send('STUB - poke types list')
        res.render('showType', { pokemon: JSON.parse(body) })
      }
  })
})

// Routes
router.get('/', (req, res) => {
  db.pokemon.findAll()
  .then(pokemon => {
    res.render('show', { pokemon })
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
      res.render('show', { pokemon })
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
  .then(createdDino => {
    res.redirect('/')
  })
  .catch(err => {
    console.log(err)
    res.send('Uh oh sorry')
  })
});

module.exports = router;
