'use strict';
module.exports = (sequelize, DataTypes) => {
  var myLists = sequelize.define('myLists', {
    artists: DataTypes.STRING,
    year: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    trackList: DataTypes.STRING,
    formats: DataTypes.STRING,
    listType: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return myLists;
};