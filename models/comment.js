'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    author: DataTypes.STRING,
    content: DataTypes.TEXT,
    favoriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return comment;
};