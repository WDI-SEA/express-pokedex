'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorites', {
    title: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favorite;
};
