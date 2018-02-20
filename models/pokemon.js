'use strict';
module.exports = (sequelize, DataTypes) => {
  var pokemon = sequelize.define('pokemon', {
    name: DataTypes.STRING,
    pokeImage: DataTypes.STRING,
    pokeHeight: DataTypes.INTEGER,
    pokeWeight: DataTypes.INTEGER
  }, {});
  pokemon.associate = function(models) {
    // associations can be defined here
  };
  return pokemon;
};