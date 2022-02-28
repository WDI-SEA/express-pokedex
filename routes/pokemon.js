const { default: axios } = require("axios");
const express = require("express");
const { append } = require("express/lib/response");
const router = express.Router();
const db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get("/", (req, res) => {
    // TODO: Get all records from the DB and render to view
    db.pokemon
        .findAll()
        .then(function (foundPokemons) {
            res.render("pokemon/favorites", { pokemon: foundPokemons });
        })
        .catch(function (err) {
            console.log("error", err);
            res.render("error");
        });
});

// GET /pokemon/:id - return name of a single pokemon associated with db ID
router.get('/:name', (req,res) => {
    let pokeName = req.params.name;
    console.log(pokeName);
    // get info from pokemon API
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    .then(apiData => {
        let imgSrc = apiData.data.sprites.front_default
        let types = apiData.data.types[0].type.name
        let height = apiData.data.height;
        let weight = apiData.data.weight;

        res.render('pokemon/show', {src:imgSrc, types, height, weight, pokeName});
    })
    .catch(err => console.log(`err:`, err));
})


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post("/", (req, res) => {
    // TODO: Get form data and add a new record to DB
    db.pokemon
        .findOrCreate({
            where: {
                name: req.body.name
            }
        })
        .then((newFave) => {
            console.log(`the new fave is:`, newFave);
            res.redirect("/pokemon")
        })
        .catch((err) => {
            console.log("error", err);
            res.render("error")
        });
});

// DELETE A Pokemon 
router.delete("/:name", (req,res) => {
    db.pokemon.destroy({
        where: {name: req.params.name}
    }).then( deletedPoke => {
        console.log(deletedPoke);
        res.redirect("/pokemon");
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;