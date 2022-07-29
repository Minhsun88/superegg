module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Member = app.model.define('member', {
    member_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    member_name: STRING(20),
    sex: INTEGER,
    phone: STRING(20),
    birthday: DATE,
    email: STRING(100),
    password: STRING(30),
  },
  {
    freezeTableName: true,
    tableName: 'member',
    timestamps: false,
  });

  return Member;
};
