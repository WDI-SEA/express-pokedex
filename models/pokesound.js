'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pokesound extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  pokesound.init({
    name: DataTypes.STRING,
    dex: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pokesound',
  });
  return pokesound;
};