'use strict';
module.exports = function(sequelize, DataTypes) {
  var favoritePokemon = sequelize.define('favoritePokemon', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favoritePokemon;
};