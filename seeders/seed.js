var axios = require('axios');
var db = require('../models');

const seedPokemon = async () => {
  var url='https://pokeapi.co/api/v2/pokemon/'
  for(let idx=1; idx<808; idx++){
    var pokemon = await axios.get(url+idx+'/')
    .then(function(response){
      var data = {
        name: response.data.name,
        weight: response.data.weight,
        height: response.data.height,
        id: response.data.id,
        spriteFrontM: response.data.sprites.front_default,
        spriteBackM:  response.data.sprites.back_default,
        spriteFrontF: response.data.sprites.front_female,
        spriteBackF: response.data.sprites.back_default,
        favorite: false
      };
      return data;
    });
    console.log(pokemon)
    db.pokemon.create(pokemon);
  }
};

seedPokemon();