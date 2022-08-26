'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('member', {
      member_id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      member_name: {
        type: STRING(20),
      },
      sex: INTEGER,
      phone: STRING(20),
      birthday: STRING(20),
      email: STRING(100),
      password: STRING(30),
      identity: STRING(15),
      address: STRING(100),
    },
    {
      freezeTableName: true,
      tableName: 'member',
      timestamps: false,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('member');
  },
};
