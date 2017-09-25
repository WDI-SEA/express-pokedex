var db = require('../models');

module.exports.createFavorite = createFavorite;
module.exports.getFavorites = getFavorites;
module.exports.newPokemon = newPokemon;
module.exports.removeFavorite = removeFavorite;

function createFavorite(reqBody) {
    return db.pokemon.create(reqBody);
}

function getFavorites() {
    return db.pokemon.findAll();
}

function newPokemon() {
    //eventual create new pokemon?
    console.log("nothing doing")
}

function removeFavorite() {
    // DELETE - remove favorite from database
    db.pokemon.destroy({
        where: { name: pokemon.name }
    }).then(function() {
        // do something when done deleting
    });
}