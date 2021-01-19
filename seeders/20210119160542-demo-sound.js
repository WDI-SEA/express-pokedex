'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pokesounds', [
      { name: 'bulbasaur',
        dex: '001',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      { name: 'ivysaur',
        dex: '002',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { name: 'venusaur',
        dex: '001',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { name: 'pikachu',
        dex: '025',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pokesounds', null, {})
  }
};
