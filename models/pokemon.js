'use strict';
module.exports = function(sequelize, DataTypes) {
  var pokemon = sequelize.define('pokemon', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    pokemon_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return pokemon;
};