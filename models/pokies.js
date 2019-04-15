'use strict';
module.exports = (sequelize, DataTypes) => {
  const pokies = sequelize.define('pokies', {
    number: DataTypes.INTEGER
  }, {});
  pokies.associate = function(models) {
    // associations can be defined here
  };
  return pokies;
};
