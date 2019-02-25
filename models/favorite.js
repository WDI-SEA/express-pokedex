'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('favorite', {
    name: DataTypes.STRING
  }, {});
  favorite.associate = function(models) {
    // associations can be defined here
  };
  return favorite;
};