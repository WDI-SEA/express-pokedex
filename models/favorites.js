'use strict';
module.exports = (sequelize, DataTypes) => {
  var favorites = sequelize.define('favorites', {
    url: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  favorites.associate = function(models) {
    // associations can be defined here
  };
  return favorites;
};