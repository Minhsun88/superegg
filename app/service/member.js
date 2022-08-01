'use strict';
const Service = require('egg').Service;

class memberService extends Service {
  async pageData(params) {
    return await this.app.model.Member.findAll(
      {
        limit: 5,
        offset: (parseInt(params) - 1) * 5,
      }
    );
  }

  async getCount() {
    return await this.app.model.Member.count();
  }

  async createData(params) {
    await this.app.model.Member.create({
      member_name: params.name,
      sex: params.sex,
      phone: params.phone,
      birthday: params.birthday,
      email: params.email,
      password: params.password,
    });
  }

  async deleteData(params) {
    await this.app.model.Member.destroy({
      where: {
        member_id: params.member_id,
      },
    });
  }

  async updateData(params) {
    await this.app.model.Member.update(
      {
        member_name: params.name,
        sex: params.sex,
        phone: params.phone,
        birthday: params.birthday,
        email: params.email,
        password: params.password,
      },
      {
        where: {
          member_id: params.member_id,
        },
      }
    );
  }
}

module.exports = memberService;
