var db = require('./models');
/*
db.favorites.create({
  name: 'Exeggcute',
  url: "https://pokeapi.co/api/v2/pokemon/102/"
}).then(function(favorite) {
  console.log('Created: ', favorite.name)
})
*/
db.favorites.findAll().then(favorite => {
  console.log('Found: ', favorite)
})
