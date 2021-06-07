const { default: axios } = require("axios");
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
  // Get form data
  let pokeName = req.body.name;
  // Add new record to database
  async function findOrCreatePokemon() {
    try {
      const [pokemon, created] = await db.pokemon.findOrCreate({
        where: { name: pokeName },
      });
      // Redirect to pokemon favorites
      res.redirect("/pokemon");
    } catch (error) {
      console.log(error);
    }
  }
  findOrCreatePokemon();
});

// DELETE favorite pokemon
router.delete("/", async (req, res) => {
  let removePokemon = req.body.name;

  try {
    await db.pokemon.destroy({
      where: { name: removePokemon },
    });

    res.redirect("/pokemon");
  } catch (err) {
    console.log(err);
  }
});

router.get("/:name", async (req, res) => {
  try {
    if (req.params.name) {
      const pokeDataUrl = `https://pokeapi.co/api/v2/pokemon/${req.params.name.toLowerCase()}`;
      const result = await axios.get(pokeDataUrl);
      let response = result.data;
      res.render("more-info", {
        response: response,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
