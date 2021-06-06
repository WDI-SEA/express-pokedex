// Make sure to require your models in the files where they will be used.
const db = require('./models');

// db.pokemon.create({
//     name: 'pikachu'
//   }).then(poke => {
//     console.log('Created: ', poke.name)
//   })

db.pokemon.findOne({
  where: {
    name: 'pikachu'
  }
}).then(poke => {
  console.log('Found: ', poke.name)
})
// * <form action="/pokemon/<%= pokemon.name %>/?_method=DELETE" method="POST">
// <label for=""> Delete <%= pokemon.name %> </label>
// <input type="submit" value="Delete"/>
// </form>  */
// <img src="<%= creature.img_url %>" alt="<%= creature.type %>" width="700">