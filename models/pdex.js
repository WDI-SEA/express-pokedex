'use strict';
module.exports = (sequelize, DataTypes) => {
  const pdex = sequelize.define('pdex', {
    name: DataTypes.STRING
  }, {});
  pdex.associate = function(models) {
    // associations can be defined here
  };
  return pdex;
};