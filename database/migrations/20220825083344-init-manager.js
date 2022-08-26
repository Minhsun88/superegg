'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('manager', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING(30),
      account: STRING(30),
      password: STRING(30),
    },
    {
      freezeTableName: true,
      tableName: 'manager',
      timestamps: false,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('manager');
  },
};
