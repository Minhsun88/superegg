'use strict';
const Service = require('egg').Service;

class managerService extends Service {
  async getData(params) {
    let data;

    if (params.account === '') {
      data = { message: '帳號不能為空' };
    } else if (params.password === '') {
      data = { message: '密碼不能為空', account: params.account };
    } else {
      const manager = await this.app.model.Manager.findOne({
        where: {
          account: params.account,
        },
      });
      if (manager === null) {
        data = { message: '此帳號尚未註冊', account: params.account, password: params.password };
      } else if (params.password !== manager.password) {
        data = { message: '密碼錯誤', account: params.account, password: params.password };
      } else {
        data = true;
      }
    }

    return data;
  };
}

module.exports = managerService;
