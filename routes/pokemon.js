const express = require("express");
const router = express.Router();
const db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get("/", (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon
    .findAll()
    .then((favePokemon) => {
      res.render("pokemon/index.ejs", { favePokes: favePokemon });
    })
    .catch(error);
  console.log(error);
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post("/", async (req, res) => {
  // TODO: Get form data and add a new record to DB
  try {
    await db.pokemon.create({ name: req.body.name });
    res.redirect("/pokemon");
  } catch {
    console.log("err, err");
  }
});

router.get("/:name", (req, res) => {
  let pokeName = req.params.name;
  console.log(pokeName);

  axios.get(`https://pokeapi/v2/pokemon/${pokeName}`).then((apiRes) => {
    //   <img src="<%=pokemon.img%> " alt="" />
    // <p>Height: <%=pokemon.height%></p>
    // <p>Weight: <%= pokemon.weight%></p>
    // <p>Type: <%= pokemon.type%></p>
  });
});

module.exports = router;
