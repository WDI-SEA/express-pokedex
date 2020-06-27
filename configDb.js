const axios = require('axios'); 


//sequelize model:create --name pokemon --attributes name:string



function populatePokemon(){
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    console.log(apiResponse.data.results)
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })
}