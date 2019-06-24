'use strict';
module.exports = (sequelize, DataTypes) => {
  const pokemon = sequelize.define('pokemon', {
    name: DataTypes.STRING,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    base_experience: DataTypes.INTEGER
  }, {});
  pokemon.associate = function(models) {
    // associations can be defined here
  };
  return pokemon;
};