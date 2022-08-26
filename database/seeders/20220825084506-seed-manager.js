'use strict';

module.exports = {
  up: async (queryInterface, sequelize) => {
    await queryInterface.bulkInsert("manager", [{
      name: 'Minhsun88',
      account: 'Minhsun88',
      password: '@Minhsun88',
    }], {});
  },
  down: async (queryInterface, sequelize) => {
    await queryInterface.bulkDelete("manager", null, {});
  }
};
