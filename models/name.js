'use strict';
module.exports = (sequelize, DataTypes) => {
  var name = sequelize.define('name', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return name;
};