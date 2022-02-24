// Make sure to require your models in the files where they will be used.
const db = require("./models");

/*
db.pokedex
  .create({
    name: "pikachu",
  })
  .then((poke) => {
    console.log("Created: ", poke.name);
  });

db.pokedex
  .findOne({
    where: {
      name: "pikachu",
    },
  })
  .then((poke) => {
    console.log("Found: ", poke.name);
  });
*/

// create some pokemon with async/await syntax
const createPokemon = async () => {
  try {
    const newPokemon = await db.pokedex.create({
      name: "charizard",
    });
    console.log(`new pokemon is:`, newPokemon.name);
    const foundPokemon = await db.pokedex.findOne({
      where: {
        name: "charizard",
      },
    });
  } catch (err) {
    console.log("ERROR: ", err);
  }
};
createPokemon();

/*
async function createPokemon() {
  try {
    const newPokemon = await db.pokedex.create({ name: "charizard" });
    console.log("the new pokemon is:", newPokemon);
    const foundPokemon = await db.pokedex.findOne({
      where: {
        name: "charizard",
      },
    });
    console.log("the found pokemon is:", foundPokemon);
  } catch (err) {
    console.log(err);
  }
}
async function findPikachu() {
  await db.pokedex
    .findOne({
      where: {
        name: "pikachu",
      },
    })
    .then((poke) => {
      console.log("Found: ", poke.name);
    });
}

db.pokedex
  .findOne({
    where: {
      name: "pikachu",
    },
  })
  .then((poke) => {
    console.log("Found: ", poke.name);
  });

  */

// findPikachu();
// db.pokedex
//   .findAll({
//     where: { name: "Pikachu" },
//   })
//   .then((poke) => {
//     console.log("Found: ", poke.name);
//   });

// createPokemon();
