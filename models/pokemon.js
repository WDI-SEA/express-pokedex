'use strict';
module.exports = (sequelize, DataTypes) => {
  var pokemon = sequelize.define('pokemon', {
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    pokemonId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return pokemon;
};