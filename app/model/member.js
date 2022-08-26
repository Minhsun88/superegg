module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Member = app.model.define('member', {
    memberId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      filed: 'member_id',
    },
    memberName: {
      type: STRING(20),
      filed: 'member_name',
    },
    sex: INTEGER,
    phone: STRING(20),
    birthday: DATE,
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

  return Member;
};
