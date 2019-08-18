require('dotenv').config();

const express = require('express');
const methodOverride = require('method-override');

const axios = require('axios');

const layouts = require('express-ejs-layouts');
const app = express();

const port = process.env.PORT || 3000;
const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';
let limit = 20;
// let pokeList = [];


app.use(methodOverride('_method'));
app.use('/', express.static('static'));
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: false
}));

app.use(layouts);

// Ick? Mixed async/await and a promise array? 
async function getPokemonSummary() {

  const bl = await getMasterPokeList();

  let subQueryPromises = [];
  bl.forEach(e => {
    subQueryPromises.push(axios.get(e.url))
  })

  try {
    let pokeList = [];
    return axios.all(subQueryPromises)
      .then((resultOfSubquery) => {
        resultOfSubquery.forEach((subQueryResponse) => {
          pokeList.push({
            name: subQueryResponse.data.name,
            sprite: subQueryResponse.data.sprites.front_default
          });
        })
      })
      .then(() => {
        return pokeList;
      });
  } catch (err) {
    console.log(err);
  }
}

async function getMasterPokeList() {
  try {
    const bigListOfPokemon = await axios.get(`${pokemonUrl}?limit=${limit}`);
    return bigListOfPokemon.data.results;
  } catch (err) {
    console.error(err);
  }
}

app.get('/', async (req, res) => {
  let pokeSummary = await getPokemonSummary();

  // res.send(pokeSummary);
  res.render('index', {
    pokemon: pokeSummary
  })

})
// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./controllers/pokemon'));

///////////////////////////////////////////
app.get('*', (req, res) => {
  res.render('404');
});


let server = app.listen(port, () => {
  console.log('Express is listening on', port);
});

module.exports = server;