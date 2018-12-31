'use strict';
module.exports = (sequelize, DataTypes) => {
  const fave_pokemon = sequelize.define('fave_pokemon', {
    species: DataTypes.STRING
  }, {});
  fave_pokemon.associate = function(models) {
    // associations can be defined here
  };
  return fave_pokemon;
};