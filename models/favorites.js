'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define('favorites', {
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  favorites.associate = function(models) {
    // associations can be defined here
  };
  return favorites;
};