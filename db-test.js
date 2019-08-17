let db = require('./models');

// db.pokemon.create({
//   name: 'Pikachu'
// }).then(function(poke) {
//   console.log('Created: ', poke.name)
// })

db.pokemon.findAll()
.then((poke) => {
  poke.forEach(p => {
    console.log(p.name)
  });
})
.catch(err => {
  console.log(err);
})

