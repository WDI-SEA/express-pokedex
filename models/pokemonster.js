'use strict';
module.exports = (sequelize, DataTypes) => {
  var pokemonster = sequelize.define('pokemonster', {
    name: DataTypes.STRING
  }, {});
  pokemonster.associate = function(models) {
    // associations can be defined here
  };
  return pokemonster;
};