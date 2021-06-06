const db = require("./models");

const createPokemon = () => {
  db.pokemon
    .create({
      name: "pikachuuuuuuuuuuuuu",
    })
    .then((poke) => {
      console.log("Created: ", poke.name);
    });
};

createPokemon();

// db.pokemon
//   .findOne({
//     where: {
//       name: "pikachu",
//     },
//   })
//   .then((poke) => {
//     console.log("Found: ", poke.name);
//   });
