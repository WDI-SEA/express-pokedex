const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get("/", async (req, res) => {
  // TODO: Get all records from the DB and render to view
  const allFaves = await db.pokemon.findAll();

  res.render("pokemon/index.ejs", { allFaves });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post("/", async (req, res) => {
  // TODO: Get form data and add a new record to DB
  await db.pokemon.findOrCreate({
    where: {
      name: req.body.name,
    },
  });

  res.redirect("/pokemon");
});

router.delete("/:name", async (req, res) => {
  try {
    const instance = await db.pokemon.findOne({
      where: {
        name: req.params.name,
      },
    });

    await instance.destroy();
  } catch (err) {
    console.warn(err);
  }

  res.redirect("/pokemon");
});

router.get("/:name", async (req, res) => {
  const poke = req.params.name;
  const pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`);
  const { abilities, sprites, types } = pokeData.data;

  res.render("pokemon/show.ejs", {
    name: poke,
    abilities,
    sprites,
    types,
  });
});

module.exports = router;
