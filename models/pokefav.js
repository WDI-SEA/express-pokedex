'use strict';
module.exports = (sequelize, DataTypes) => {
  var pokefav = sequelize.define('pokefav', {
    height: DataTypes.INTEGER,
    base_experience: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return pokefav;
};