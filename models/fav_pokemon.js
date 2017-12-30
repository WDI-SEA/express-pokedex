'use strict';
module.exports = (sequelize, DataTypes) => {
  var fav_pokemon = sequelize.define('fav_pokemon', {
    name: DataTypes.STRING,
    index: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return fav_pokemon;
};