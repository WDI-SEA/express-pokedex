const { default: axios } = require("axios");
const express = require("express");
const { type } = require("express/lib/response");
const router = express.Router();
const db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get("/", (req, res) => {
  db.pokedex
    .findAll()
    .then((favePokemon) => {
      res.render("pokemon/index.ejs", { favePokes: favePokemon });
    })
    .catch((err) => {
      console.log(err);
    });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post("/", async (req, res) => {
  try {
    await db.pokedex.create({ name: req.body.name });
    res.redirect("/pokemon");
  } catch (err) {
    console.log("ERROR! ", err);
  }
});

router.get("/:name", async (req, res) => {
  let pokeName = req.params.name;
  try {
    const apiResults = await axios.get(
      `http://pokeapi.co/api/v2/pokemon/${pokeName}/`
    );
    let imgSrc = apiResults.data.sprites.front_shiny;
    let type = apiResults.data.types[0].type.name;
    let height = apiResults.data.height;
    let weight = apiResults.data.weight;
    res.render("pokemon/show", {
      imgSrc: imgSrc,
      type: type,
      height: height,
      weight: weight,
      name: pokeName,
    });
  } catch (err) {
    console.log("ERROR! ", err);
  }
});

module.exports = router;
