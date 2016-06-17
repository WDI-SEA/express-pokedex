'use strict';
module.exports = function(sequelize, DataTypes) {
  var pokemon = sequelize.define('pokemon', {
    name: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return pokemon;
};
