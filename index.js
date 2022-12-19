const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3000;
const db = require('./models')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', (req, res) => {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data.results;
    //console.log(pokemon)
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })
})

// app.get('/pokemon', function(req,res){
//   res.render('pokemon.js')
// })
// app.get('/pokemon',async function(req,res){
// try{
// const fave = await db.pokemon.findAll()
// res.render('index.ejs',{
// name: pokemon.name
// })
// } catch (error){
//   res.send(error)
// }
// })
// app.post('/pokemon', async function(req,res){
//  try{
//   const [row,created] = await db.pokemon.findOrCreate({
//     where:{
//       name: req.body.name
//     }
//   })
//   res.redirect('/pokemon')
//  } catch(error){
//   res.send('no')
//  }
// })
// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

app.listen(port, () => {
  console.log('...listening on', port );
});

