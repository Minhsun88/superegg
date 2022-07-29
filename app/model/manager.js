module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
 
  const Manager = app.model.define('manager', {
    manager_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    manager_name: STRING(30),
    account: STRING(30),
    password: STRING(30),
  },
  {
    freezeTableName: true,
    tableName: "manager",
    timestamps: false,
  });
 
  return Manager;
};