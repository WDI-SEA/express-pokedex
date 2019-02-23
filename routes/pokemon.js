var express = require("express");
var request = require("request");
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get("/", function(req, res) {
  // TODO: Get all records from the DB and render to view
  // res.send("Render a page of favorites here");
  res.render("pokemon/faves", {});
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post("/", function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

router.get("/:search", (req, res) => {
  //? note :search can be either name or number
  // query api for single pokemon
  // then data -> render show.ejs { pokemon }
  let qs = req.params.search;
  var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/` + qs;

  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body);
    request(pokemon.species.url, (error, response, body) => {
      if (error) {
        console.log(error);
        res.send("not found");
      }
      if (!error && response.statusCode == 200) {
        let flavorText = JSON.parse(body).flavor_text_entries;
        let text = flavorText.find(entry => {
          return entry.language.name == "en";
        });
        res.render("pokemon/show", { pokemon, text });
      }
    });
  });
});

module.exports = router;
