'use strict';
module.exports = (sequelize, DataTypes) => {
  var pokemon = sequelize.define('pokemon', {
    pokeid: DataTypes.INTEGER,
    name: DataTypes.STRING,
    baseexp: DataTypes.INTEGER,
    imageurl: DataTypes.STRING,
    abilities: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return pokemon;
};
