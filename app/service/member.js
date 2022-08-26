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
      memberName: params.memberName,
      sex: params.sex,
      phone: params.phone,
      birthday: params.birthday,
      email: params.email,
      password: params.password,
      identity: params.identity,
      address: params.address,
    });
  }

  async deleteData(params) {
    await this.app.model.Member.destroy({
      where: {
        memberId: params.memberId,
      },
    });
  }

  async updateData(params) {
    await this.app.model.Member.update(
      {
        memberName: params.memberName,
        sex: params.sex,
        phone: params.phone,
        birthday: params.birthday,
        email: params.email,
        password: params.password,
      },
      {
        where: {
          memberId: params.memberId,
        },
      }
    );
  }
}

module.exports = memberService;
