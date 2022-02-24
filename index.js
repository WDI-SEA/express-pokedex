const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const db = require('./models')

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', (req, res) => {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data.results;
    // console.log(pokemon)
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })
});

app.get('/pokemon', async (req,res)=>{
  try {
   const favePokemon =  await db.pokemon.findAll()
  //  console.log(favePokemon)
    res.render('pokemon/index.ejs',{pokemon: favePokemon})
  }catch (error){
    console.log(error)
  }
})
app.post('/pokemon', async (req,res)=>{
  try {
    await db.pokemon.create({
      name: req.body.name
    })
    res.redirect('/pokemon')
  }catch(error){
    console.log(error)
  }
  
})

app.get('/pokemon/:name',async (req,res)=>{
  try {
    let pokemonUrl = await axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.name}`)
    let pokemon = pokemonUrl.data
    res.render('pokemon/show.ejs', {pokemon: pokemon}) 
  } catch (error){
    console.log(error)
    
  }
})




// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

app.listen(port, () => {
  console.log('...listening on', port );
});