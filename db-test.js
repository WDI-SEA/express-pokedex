// Make sure to require your models in the files where they will be used.
var db = require("./models");

// db.pokemon
//   .create({
//     name: "Pikachu",
//   })
//   .then(function (poke) {
//     console.log("Created: ", poke.name);
//   });

// db.pokemon.findAll().then((poke) => {

//   console.log("Found: ", poke.name);
// });

db.pokemon
  .destroy({
    where: {
      id: 3,
    },
  })
  .then((poke) => {
    console.log(`Deleted ${poke.name} from favorites`);
  })
  .catch((err) => {
    console.log(err);
  });
