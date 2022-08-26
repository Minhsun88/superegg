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
    const certificate = {};
    const rule = { logincheck : 'logincheck' };

    try {
      const data = await this.ctx.service.manager.getData(params);
      params.data = data;
      certificate.logincheck = params;
      ctx.validate( rule, certificate );
      
      await ctx.redirect('/member/1');
    }catch (err) {
      await ctx.render('login.ejs', { message: err.errors[0].message, account: params.account, password: params.password });
    }
  }
}

module.exports = managerController;
