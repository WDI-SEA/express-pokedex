'use strict';
module.exports = (sequelize, DataTypes) => {
  const pokemon = sequelize.define('pokemon', {
    name: DataTypes.STRING,
    weight: DataTypes.STRING,
    height: DataTypes.STRING,
    spriteFrontM: DataTypes.STRING,
    spriteBackM: DataTypes.STRING,
    spriteFrontF: DataTypes.STRING,
    spriteBackF: DataTypes.STRING,
    favorite: DataTypes.BOOLEAN
  }, {});
  pokemon.associate = function(models) {
    // associations can be defined here
  };
  return pokemon;
};