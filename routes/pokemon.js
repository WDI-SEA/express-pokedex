const express = require("express")
const router = express.Router()
const db = require("../models")
const axios = require("axios")
const helper = require("../views/helper.js")

// GET /pokemon - return a page with favorited Pokemon
router.get("/", async (req, res) => {
  // TODO: Get all records from the DB and render to view
  const pokemon = await db.pokemon.findAll()
  res.render("pokemon/index", { pokemon, helper })
  // res.send("Render a page of favorites here")
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post("/", async (req, res) => {
  // TODO: Get form data and add a new record to DB
  await db.pokemon.findOrCreate({ where: { name: req.body.name } })
  res.redirect("/pokemon")
})

router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name

    const pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${name}`
    const response = await axios.get(pokemonUrl)
    const pokemon = response.data

    const imgUrl = pokemon.sprites.other["official-artwork"].front_default
    const height = pokemon.height
    const weight = pokemon.weight
    const stats = pokemon.stats.map((stat) => {
      const name = stat.stat.name
      const amount = stat.base_stat
      return { name, amount }
    })

    res.render("pokemon/show", { name, imgUrl, height, weight, stats, helper })
  } catch (err) {
    console.error("error fetching pokemon", err)
  }
})

module.exports = router
