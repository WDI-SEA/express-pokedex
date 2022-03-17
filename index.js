const express = require("express");
const axios = require("axios");
const ejsLayouts = require("express-ejs-layouts");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get("/", (req, res) => {
  let pokemonUrl = "http://pokeapi.co/api/v2/pokemon/";
  // Use request to call the API
  axios.get(pokemonUrl).then((apiResponse) => {
    let pokemon = apiResponse.data.results;
    res.render("index", { pokemon: pokemon.slice(0, 151) });
  });
});

// Imports all routes from the pokemon routes file  --Controller
app.use("/pokemon", require("./routes/pokemon"));

app.post("/pokemon", async (req, res) => {
  try {
    await db.pokemon.create({
      name: req.body.name,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("...listening on", port);
});
