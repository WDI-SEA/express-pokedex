var express = require("express");
var router = express.Router();
var db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function (req, res) {
  db.pokemon.findAll()
    .then(function (pokemons) {
      res.render('pokemon/index', {
        pokemons: pokemons
      })
      .catch(function(err) {console.log(err)})
    });
})

router.post("/", function (req, res) {
  db.pokemon.create({
    name: JSON.stringify(req.body.name)
  }).then;
  res.send(JSON.stringify(req.body.name) + "was added to database.");
});


// router.get('/', function (req, res) {
//   db.pokemon.findAll()
//     .then(function (pokemons) {
//       res.render('/pokemon/index', {
//         pokemons: pokemons
//       });
//     });
// })

module.exports = router;
