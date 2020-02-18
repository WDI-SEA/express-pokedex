'use strict';
module.exports = (sequelize, DataTypes) => {
  const pokemon = sequelize.define('pokemon', {
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  pokemon.associate = function(models) {
    // associations can be defined here
  };
  return pokemon;
};