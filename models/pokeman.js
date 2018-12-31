'use strict';
module.exports = (sequelize, DataTypes) => {
  const pokeman = sequelize.define('pokeman', {
    name: DataTypes.TEXT
  }, {});
  pokeman.associate = function(models) {
    // associations can be defined here
  };
  return pokeman;
};