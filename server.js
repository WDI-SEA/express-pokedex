require('dotenv').config();
const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');

const db = require('./models')

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);


app.use('/pokemon', require('./routes/pokemon'));

app.get('/', function (req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151&offset=0';
    // Use request to call the API
    axios.get(pokemonUrl).then(function (apiResponse) {
        var pokemon = apiResponse.data.results;
        res.render('server', { pokemon: pokemon.slice(0, 151) });
    })
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;