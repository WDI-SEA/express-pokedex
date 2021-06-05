const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
  async function findPoke() {
    try {
      const findPoke = await db.pokemon.findAll();
      // res.send(findPoke)
      res.render("favorites", { pokemon: findPoke });
    } catch (error) {
      console.log(error);
    }
  }
  findPoke();
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post("/", function (req, res) {
  //posts are mounted on the req body object
  let pokeName = req.body.name;
  console.log(pokeName);
  async function findOrCreatePokemon() {
    try {
      // the findOrCreate promise returns an array with two elements,
      // so 'array destructuring' is used to assign the names to the elements
      const [pokemon, created] = await db.pokemon.findOrCreate({
        // where is used search for values in columns
        where: {
          name: pokeName,
        },
      });
      console.log(`${pokemon.name} was ${created ? "created" : "found"}`);
      res.redirect("/pokemon");
      // res.json({ username: "Flavio" });
    } catch (error) {
      console.log(error);
    }
  }
  findOrCreatePokemon();
});

// DELETE favorite pokemon
router.delete("/pokemon:name", (req, res) => {
  let removePokemon = req.body.name;
  async function deletePokemon() {
    try {
      // delete pokemon 'removePokemon'
      // const [pokemon, ...] = await db.pokemon.
      const [pokemon, removePokemon] = await db.pokemon.destroy({
        where: { name: removePokemon },
      });
      console.log(await db.pokemon.all());
      console.log(`💀 Name of removePokemon: ${removePokemon}`);
    } catch (err) {
      console.log(err);
    }
    deletePokemon();
  }
});
module.exports = router;
