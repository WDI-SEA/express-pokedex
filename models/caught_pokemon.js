'use strict';
module.exports = (sequelize, DataTypes) => {
  const caught_pokemon = sequelize.define('caught_pokemon', {
    species: DataTypes.STRING,
    nickname: DataTypes.STRING,
    level: DataTypes.INTEGER
  }, {});
  caught_pokemon.associate = function(models) {
    // associations can be defined here
  };
  return caught_pokemon;
};