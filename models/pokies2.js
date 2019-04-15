'use strict';
module.exports = (sequelize, DataTypes) => {
  const pokies2 = sequelize.define('pokies2', {
    number: DataTypes.INTEGER
  }, {});
  pokies2.associate = function(models) {
    // associations can be defined here
  };
  return pokies2;
};