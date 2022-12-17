// const db = require("db");
const express = require("express");
const app = express();
const Pokemon = require("./Pokemon");
const axios = require("axios");
const { urlencoded } = require("express");
app.set('view engine','ejs')

app.use(express.json())
app.use(express.urlencoded({extended:false}));

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

app.get("/", async (req, res) => {
    try {
        let data = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=8&&offset=${getRandomInt(1145)}`)
        let pokemon = await data.data.results
        
        res.render('index',{
          pokemon:pokemon  
        })
    } catch (error) {
        // console.error(error);
    }
});

app.listen(8000, () => {
  console.log("listening for requests on port 8000");
});

// let num = pokemon[0].url.split('/').filter(c => !isNaN(c)&&c!=='')
//         console.log(Number(num));