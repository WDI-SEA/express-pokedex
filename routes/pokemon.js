var express = require("express");
var router = express.Router();
const axios = require("axios");
var db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get("/", function (req, res) {
  // TODO: Get all records from the DB and render to view
  // res.send("Render a page of favorites here");
  db.pokemon.findAll().then((poke) => {
    res.render("pokemon/index", { pokemon: poke });
  });
});

// GET /pokemon/:id - render a show page with information about a single pokemon
router.get("/:id", (req, res) => {
  db.pokemon
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((poke) => {
      var pokemonUrl =
        "http://pokeapi.co/api/v2/pokemon/" +
        poke.dataValues.name.toLowerCase();
      // Use request to call the API
      axios
        .get(pokemonUrl)
        .then(function (apiResponse) {
          let pokeData = apiResponse.data;
          // res.send(pokeData);
          res.render("pokemon/show", { pokeData: pokeData });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post("/", function (req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon
    .create({
      name: req.body.name,
    })
    .then(function (poke) {
      console.log("Created: ", poke.name);
      res.redirect("/pokemon");
    });
});

router.delete("/:id", (req, res) => {
  db.pokemon
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((poke) => {
      console.log(`Deleted ${poke.name} from favorites`);
      res.redirect("/pokemon");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
