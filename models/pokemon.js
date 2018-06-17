'use strict';
module.exports = (sequelize, DataTypes) => {
  var pokemon = sequelize.define('pokemon', {
    name: DataTypes.STRING,
    img: DataTypes.STRING
  }, {});
  pokemon.associate = function(models) {
    // associations can be defined here
  };
  return pokemon;
};