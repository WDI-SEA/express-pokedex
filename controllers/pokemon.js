var express = require('express');
var router = express.Router();

// GET - return a page with favorited Pokemon

// router.get('/', function(req, res){
//   res.send("favorites page");
// });

// router.get('/', function(req, res) {
//   db.pokemon.findAll({
//     order: 'name ASC' })
//   .then(function(pokemon) {
//     res.render('favorites', { pokemon: pokemon });
//   })
//   .catch(function(err){
//     console.log(err);
//     res.send("Doh Pokedex Server Error.")
//   });
// });

// router.get('/', function(req, res){
//    db.pokemon.findAll().then(function(pokemon) {
//    res.render('favorites', {pokemon: pokemon});
//   });
// });

// POST - receive the name of a pokemon and add it to the database
// router.post('/', function(req, res) {
//   res.send(req.body);
// });

// router.post("/", function(req, res){
//   db.pokemon.create({
//     name: req.body.name
//   }).then(function(data){
//     //You can now access newly created data
//     if(data){
//       res.status(200).redirect("/");
//     }
//     else {
//       res.status(500).send("Server error");
//     }
//   });
// });

module.exports = router;
