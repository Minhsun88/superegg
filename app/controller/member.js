'use strict';

const Controller = require('egg').Controller;

class indexController extends Controller {
  async member() {
    const { ctx } = this;
    const params = this.ctx.params;
    const member = await this.ctx.service.member.pageData(params.page);
    const count = await this.ctx.service.member.getCount();
    await ctx.render('index.ejs', { data: member, page: count });
  }
  async regist() {
    const { ctx } = this;
    await ctx.render('regist.ejs');
  }
  async create() {
    const { ctx } = this;
    const params = this.ctx.request.body;
    const fullchinese = /^[\u4e00-\u9fa5]+$/;
    const email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z] {2,4} )$/;
    const phone = /^[0-9] {10}$/g;
    const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S] {8,16} $/;
    let err = 0;
    let msg = {};
    if(params.name === "") {
      msg.name = '（輸入不能為空值）';
      err++;
    }else if(!fullchinese.test(params.name)) {
      msg.name = '（名稱只能輸入中文）';
      err++;
    }
    if(params.phone === "") {
      msg.phone = '（輸入不能為空值）';
      err++;
    }else if(!phone.test(params.phone)) {
      msg.phone = '（手機 格式不正確）';
      err++;
    }
    if(params.birthday === "") {
      msg.birthday = '（輸入不能為空值）';
      err++;
    }
    if(params.email === "") {
      msg.email = '（輸入不能為空值）';
      err++;
    }else if(!email.test(params.email)) {
      msg.email = '（email 格式不正確）';
      err++;
    }
    if(params.password === "") {
      msg.password = '（輸入不能為空值）';
      err++;
    }else if(!password.test(params.password)) {
      msg.password = '（密碼必須包含數字、大小寫，至少8位數）';
      err++;
    }
    if("undefined" === typeof params.sex) {
      msg.sex = '（請選擇性別）';
      err++;
    }
    if(err > 0) {
      await ctx.render('regist.ejs', { msg: msg, inputvalues: params });
    }else {
      await this.ctx.service.member.createData(params);
      await ctx.redirect('/member/1');
    }
  }
  async alter() {
    const { ctx } = this;
    const params = this.ctx.request.body;
    if(Object.keys(params).length !== 0) {
      const data = await this.app.model.Member.findOne( {
        where: { member_id: params.id }
      });
      await ctx.render('alter.ejs', { data: data } );
    }else {
      let member = await this.ctx.service.member.pageData('1');
      const count = await this.ctx.service.member.getCount();
      await ctx.render('index.ejs', { data: member, page: count, msg: '請選擇修改項目' } );
    }
  }
  async update() {
    const { ctx } = this;
    const params = this.ctx.request.body;
    let fullchinese = /^[\u4e00-\u9fa5]+$/;
    let email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z] {2,4} )$/;
    let phone = /^[0-9] {10} $/g;
    let password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S] {8,16} $/;
    let err = 0;
    let msg = {};
    if(params.name === "") {
      msg.name = '（輸入不能為空值）';
      err++;
    }else if(!fullchinese.test(params.name)) {
      msg.name = '（名稱只能輸入中文）';
      err++;
    }
    if(params.phone === "") {
      msg.phone = '（輸入不能為空值）';
      err++;
    }else if(!phone.test(params.phone)) {
      msg.phone = '（手機 格式不正確）';
      err++;
    }
    if(params.birthday === "") {
      msg.birthday = '（輸入不能為空值）';
      err++;
    }
    if(params.email === "") {
      msg.email = '（輸入不能為空值）';
      err++;
    }else if(!email.test(params.email)) {
      msg.email = '（email 格式不正確）';
      err++;
    }
    if(params.password === "") {
      msg.password = '（輸入不能為空值）';
      err++;
    }else if(!password.test(params.password)) {
      msg.password = '（密碼必須包含數字、大小寫，至少8位數）';
      err++;
    }
    if(err > 0) {
      await ctx.render('alter.ejs', { msg: msg, inputvalues: params } );
    }else {
      await this.ctx.service.member.updateData(params);
      await ctx.redirect('/member/1');
    }
  }
  async comfirm() {
    const { ctx } = this;
    const params = this.ctx.request.body;
    if(Object.keys(params).length !== 0) {
      const data = await this.app.model.Member.findOne( {
        where: { member_id: params.id } 
      });
      await ctx.render('comfirm.ejs', { data: data });
    }else {
      let member = await this.ctx.service.member.pageData('1');
      const count = await this.ctx.service.member.getCount();
      await ctx.render('index.ejs', { data: member, page: count, msg: '請選擇刪除項目'} );
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