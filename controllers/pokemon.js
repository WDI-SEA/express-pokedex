const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get("/", (req, res) => {
  // TODO: Get all records from the DB and render to view
  const getAllFavorites = async () => {
    try {
      const favorites = await db.pokemon.findAll();
      res.render("pokemon/index.ejs", {
        favorites,
      });
    } catch (error) {
      console.log(error);
    }
  };
  getAllFavorites();
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post("/", (req, res) => {
  // TODO: Get form data and add a new record to DB
  const addFavorite = async () => {
    try {
      const favorites = await db.pokemon.findOrCreate({
        where: { name: req.body.name },
        defaults: {},
      });
      res.redirect("/pokemon");
    } catch (error) {
      console.log(error);
    }
  };
  addFavorite();
});

router.get("/:name", (req, res) => {
  async function fetchPokemon() {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${req.params.name}/`
      );
      res.render("pokemon/show.ejs", {
        pokemon: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
  fetchPokemon();
});

module.exports = router;
