'use strict';
module.exports = (sequelize, DataTypes) => {
    const favpokemon = sequelize.define('favpokemon', {
        name: DataTypes.STRING
    }, {});
    favpokemon.associate = function(models) {
        // associations can be defined here
    };
    return favpokemon;
};