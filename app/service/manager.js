'use strict';
const Service = require('egg').Service;

class managerService extends Service {
  async getData(params) {
    const manager = await this.app.model.Manager.findOne({
      where: {
        account: params.account,
      },
    });
    return manager;
  }
}

module.exports = managerService;
