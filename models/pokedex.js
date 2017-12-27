'use strict';
module.exports = (sequelize, DataTypes) => {
  var pokedex = sequelize.define('pokedex', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return pokedex;
};