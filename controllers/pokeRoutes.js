const express = require('express')
const router = express.Router()
const axios = require("axios")
const db = require('../models')

//PART 3
//Retrieve all favorited Pokemon 
router.get('/', (req, res) => {
    db.pokemon.findAll()
        .then(faves => {
            //display them on the page
            res.render('pokemon/index', { results: faves })
        })
        .catch(error => {
            console.error
        })
})
//Creates a new Pokemon
router.post('/', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    console.log('this is data', data)
    db.pokemon.create({
        name: data.name
    })
    .then(createdFave => {
        console.log('db instance created: \n', createdFave)
        //redirects back to /pokemon
        res.redirect("/pokemon")
    })
    .catch(error => {
        console.error
    })
})

//PART 5
//renders a show page with information about the Pokemon
router.get('/:name', (req, res) => {
    let pokeName = req.params.name
    axios.get(`http://pokeapi.co/api/v2/pokemon/${pokeName}`)
      .then(apiRes => {
            console.log(apiRes.data, "this is apiRes.data")
            //pull at least four bits of info
            let name = apiRes.data.name
            let weight = apiRes.data.weight
            let height = apiRes.data.height
            let img = apiRes.data.sprites.other.home.front_default
            res.render('pokemon/show', { name: name, weight: weight, height: height, img: img })
        })
        .catch(error => {
            console.error
         })
})




module.exports = router