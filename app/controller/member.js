'use strict';

const Controller = require('egg').Controller;

class indexController extends Controller {
  async member() {
    const { ctx } = this;
    const params = this.ctx.params;
    const data = await this.ctx.service.member.pageData(params.page);
    const count = await this.ctx.service.member.getCount();

    await ctx.render('index.ejs', { data: data, page: count });
  }

  async regist() {
    const { ctx } = this;
    
    await ctx.render('regist.ejs');
  }

  async create() {
    const { ctx } = this;
    const params = this.ctx.request.body;
    const rule = { memberName: 'namecheck', sex: 'sexcheck', phone: 'phonecheck',
     birthday: 'birthdaycheck', email: 'emailcheck', password: 'passwordcheck',
     identity: 'identitycheck', address: 'addresscheck' };
    const message = {};

    try {
      if( typeof params.sex === 'undefined' ) {
        params.sex = '';
      }
      ctx.validate( rule, params );

      await ctx.service.member.createData(params);
      await ctx.redirect('/member/1');
    } catch (err) {
      for(let i = 0; i < err.errors.length; i++)
      {
        let code = err.errors[i].message.split(' ')[0];
        let msg = err.errors[i].message.split(' ')[1];

        if ( code === '100' ){ message.nameMsg = msg; }
        if ( code === '101' ){ message.sexMsg = msg; }
        if ( code === '102' ){ message.phoneMsg = msg; }
        if ( code === '103' ){ message.birthdayMsg = msg; }
        if ( code === '104' ){ message.emailMsg = msg; }
        if ( code === '105' ){ message.passwordMsg = msg; }
        if ( code === '106' ){ message.idMsg = msg; }
        if ( code === '107' ){ message.addMsg = msg; }
      }

      await ctx.render( 'regist.ejs', { message, inputvalues: params })
    }
  }

  async alter() {
    const { ctx } = this;
    const params = this.ctx.request.body;

    if (Object.keys(params).length !== 0) {
      const data = await this.app.model.Member.findOne({
        where: { memberId: params.memberId },
      });

      await ctx.render('alter.ejs', { data: data });
    } else {
      const data = await this.ctx.service.member.pageData('1');
      const count = await this.ctx.service.member.getCount();

      await ctx.render('index.ejs', { data: data, page: count, message: '請選擇修改項目' });
    }
  }

  async update() {
    const { ctx } = this;
    const params = this.ctx.request.body;
    const rule = { memberName: 'namecheck', sex: 'sexcheck', phone: 'phonecheck',
     birthday: 'birthdaycheck', email: 'emailcheck', password: 'passwordcheck',
     identity: 'identitycheck', address: 'addresscheck' };
    const message = {};

    try {
      ctx.validate( rule, params );

      await ctx.service.member.updateData(params);
      await ctx.redirect('/member/1');
    } catch (err) {
      for(let i = 0; i < err.errors.length; i++)
      {
        let code = err.errors[i].message.split(' ')[0];
        let msg = err.errors[i].message.split(' ')[1];

        if ( code === '100' ){ message.nameMsg = msg; }
        if ( code === '101' ){ message.sexMsg = msg; }
        if ( code === '102' ){ message.phoneMsg = msg; }
        if ( code === '103' ){ message.birthdayMsg = msg; }
        if ( code === '104' ){ message.emailMsg = msg; }
        if ( code === '105' ){ message.passwordMsg = msg; }
        if ( code === '106' ){ message.idMsg = msg; }
        if ( code === '107' ){ message.addMsg = msg; }
      }
      await ctx.render( 'alter.ejs', { message, inputvalues: params })
    }
  }

  async comfirm() {
    const { ctx } = this;
    const params = this.ctx.request.body;

    if (Object.keys(params).length !== 0) {
      const data = await this.app.model.Member.findOne({
        where: { memberId: params.memberId },
      });

      await ctx.render('comfirm.ejs', { data: data });
    } else {
      const data = await this.ctx.service.member.pageData('1');
      const count = await this.ctx.service.member.getCount();

      await ctx.render('index.ejs', { data: data, page: count, message: '請選擇刪除項目' });
    }
  }

  async delete() {
    const { ctx } = this;
    const params = this.ctx.request.body;

    await this.ctx.service.member.deleteData(params);
    await ctx.redirect('/member/1');
  }
}

module.exports = indexController;
