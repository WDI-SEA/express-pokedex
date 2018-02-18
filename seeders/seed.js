var db = require('./../models');

function seed() {
    db.pokemon.create({
      name: 'pikachu',
      nickname: 'Zappy',
      level: 5
    }).then(function(data) {
      // you can now access the newly created task via the variable data
    });
}

seed();