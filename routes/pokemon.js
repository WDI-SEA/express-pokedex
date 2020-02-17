var express = require('express');
var router = express.Router();

// // GET /pokemon - return a page with favorited Pokemon
// router.get('/pokemon', function(req, res) {
//   // TODO: Get all records from the DB and render to view
//     db.pokemon.findAll().then(function(poke) {
//         res.json(poke);
//     }).catch(err => {
//         console.log(err)
//         res.send("ERROR");
//     })
// // res.send("ALL USERS");
//   // res.send('Render a page of favorites here');
//   res.render('favorites');
// });

// not needed...// POST /pokemon - receive the name of a pokemon and add it to the database
// router.post('/', function(req, res) {
//   // TODO: Get form data and add a new record to DB
//   res.send(req.body);
// });

module.exports = router;
