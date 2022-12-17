const db = require("./models");
const express = require("express");
var methodOverride = require("method-override");
const app = express();

const axios = require("axios");
const { urlencoded } = require("express");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
/**
 * HOME ROUTE
 * GET RANDOM POKEMON
 */
app.get("/", async (req, res) => {
  try {
    let data = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=5&&offset=${getRandomInt(1145)}`
    );
    let pokemon = await data.data.results;

    res.render("index", {
      pokemon: pokemon,
    });
  } catch (error) {
    // console.error(error);
  }
});

/**
 * GET ALL FAVORITE POKEMON FROM FAVORITE TABLE
 */
app.get("/pokemon", async (req, res) => {
  try {
    let pokemon = await db.favorite.findAll();
    res.render("favorite", {
      pokemon: pokemon,
    });
    // console.log(pokemon);
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET POKEMON DETAIL
 */

app.get("/pokemon/:name", async (req, res) => {
  try {
    let pokemon = await db.favorite.findOne({
      where: {
        name: req.params.name,
      },
    });
    res.render("detail", { pokemon: pokemon });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST POKEMON TO FAVORITE TABLE
 */
app.post("/pokemon", async (req, res) => {
  try {
    // let [name,img_url,height,weight] = req.body
    console.log(req.body);
    let name = req.body.name;
    let img_url = req.body.img_url;

    let favorite = await db.favorite.findOrCreate({
      where: {
        name: name,
        img_url: img_url,
      },
    });
    res.redirect("/pokemon");
    console.log(favorite);
  } catch (error) {
    console.log(error);
  }
});

/**
 * DELETE POKEMON FROM FAVORITES
 */

// app.delete("/pokemon", async (req, res) => {
//   try {
//     let name = req.body.name;
//     let img_url = req.body.img_url;

//     let delPokemon = await db.favorite.delete({
//       where: {
//         name: name,
//         img_url:img_url
//       },
//     });
//     console.log(delPokemon);
//     res.redirect('/pokemon')
//   } catch (error) {
//     console.log(error);
//   }
// });

app.listen(8000, () => {
  console.log("listening for requests on port 8000");
});
