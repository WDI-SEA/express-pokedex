'use strict';
module.exports = (sequelize, DataTypes) => {
  var bootleg = sequelize.define('bootleg', {
    artistName: DataTypes.STRING,
    discogsId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    searchCount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return bootleg;
};