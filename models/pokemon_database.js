'use strict';
module.exports = (sequelize, DataTypes) => {
  var pokemon_database = sequelize.define('pokemon_database', {
    name: DataTypes.STRING,
    weight: DataTypes.STRING,
    height: DataTypes.STRING,
    experience: DataTypes.STRING,
    imagesrc: DataTypes.STRING,
    pokemonapi_id: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return pokemon_database;
};