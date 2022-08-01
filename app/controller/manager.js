'use strict';

const Controller = require('egg').Controller;

class managerController extends Controller {
  async login() {
    const { ctx } = this;
    await ctx.render('login.ejs');
  }

  async identify() {
    const { ctx } = this;
    const params = this.ctx.request.body;
    const certificate = await this.ctx.service.manager.getData(params);
    if (certificate === true) {
      await ctx.redirect('/member/1');
    } else {
      await ctx.render('login.ejs', certificate);
    }
  }
}

module.exports = managerController;
