const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const db = require('./models')
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site, render all 151 pokemon characters
app.get('/', (req, res) => {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151/';
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {
    let OGpokemon = apiResponse.data.results;
    res.render('index', { OGpokemon: OGpokemon.slice(0, 151) });
  })
});

// GET //pokemon/:pokemon -- READ a specific pokemon's details
app.get('/pokemon/:name', async (req, res) => {
  try {
    // url route parameters come in on the req.params
    const url = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`
    console.log(req.params)
    const response = await axios.get(url)

    res.render('detail.ejs', {
      name: response.data
    })
  } catch(err) {
    console.log('🤬🤬🤬🤬🤬', err)
    res.status(500).send('api error 🤬')
  }
})

// GET //pokemon-- READ all fave pokemon characters from pokemons DB
app.get('/pokemon', async (req, res) => {
  try {
    const allPokemons = await db.pokemon.findAll()
    res.render('faves.ejs', {
      allPokemons: allPokemons
    })
  } catch (err) {
    console.log('UGH AN ERROR', err)
    res.status(500).send('So very sorry, there\'s been an error somewhere...')
  }
})

// POST //pokemon -- CREATE a new fave pokemon in the DB
app.post('/pokemon', async (req, res) => {
  try {
    //create a new fave pokemon in the DB
    const [pokemonCharacter, create] = await db.pokemon.findOrCreate({
      where: {name: req.body.name}
    })
    console.log(pokemonCharacter)
    console.log(create)
    
    // redirect to /faves to show the user their faves
    res.redirect('/pokemon')
  } catch (err) {
    console.log('UGH AN ERROR', err)
    res.status(500).send('So very sorry, there\'s been an error somewhere...')
  }
})

// Imports all routes from the pokemon routes file
// app.use('/pokemon', require('./routes/pokemon'));


app.listen(port, () => {
  console.log('...listening on', port );
});