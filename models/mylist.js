'use strict';
module.exports = (sequelize, DataTypes) => {
  var myList = sequelize.define('myList', {
    artist: DataTypes.STRING,
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
  return myList;
};