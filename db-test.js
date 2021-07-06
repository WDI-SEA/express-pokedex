const db = require("./models");

const createPokemon = () => {
  db.pokemon
    .create({
      name: "pikachuuuTEST",
    })
    .then((poke) => {
      console.log("Created: ", poke.name);
    });
};

// createPokemon();

const findOnePokemon = () => {
  db.pokemon
    .findOne({
      where: {
        name: "pikachu",
      },
    })
    .then((poke) => {
      console.log("Found: ", poke.name);
    });
};

// findOnePokemon();

db.pokemon
  .destroy('`name` LIKE "pikachuuuTEST"')
  .then(() => {
    console.log("👺 Deleted: ");
  })
  .catch((err) => {
    console.log(err, "Promise error👺👺");
    // done();
  });
