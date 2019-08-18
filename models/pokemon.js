'use strict';
module.exports = (sequelize, DataTypes) => {
  const pokemon = sequelize.define('pokemon', {
    name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    level: DataTypes.INTEGER
  }, {});
  pokemon.associate = function(models) {
    // associations can be defined here
  };
  return pokemon;
};