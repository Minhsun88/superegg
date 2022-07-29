'use strict';

const Controller = require('egg').Controller;

class indexController extends Controller {
  async member(){
    const { ctx } = this;
    const params = this.ctx.params;
    const member = await this.ctx.service.member.pageData(params.page);
    const count = await this.ctx.service.member.getCount();
    await ctx.render('index.ejs', { member: member, page: count });
  }
  async regist(){
    const { ctx } = this;
    await ctx.render('regist.ejs');
  }
  async create(){
    const { ctx } = this;
    const params = this.ctx.request.body;
    const fullchinese = /^[\u4e00-\u9fa5]+$/;
    const email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z] {2,4} )$/;
    const phone = /^[0-9] {10}$/g;
    const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S] {8,16} $/;
    let errorpoint = 0;
    const message = {};
    if (params.name === ''){
      message.name = '（輸入不能為空值）';
      errorpoint++;
    } else if (!fullchinese.test(params.name)){
      message.name = '（名稱只能輸入中文）';
      errorpoint++;
    }
    if (params.phone === ''){
      message.phone = '（輸入不能為空值）';
      errorpoint++;
    } else if (!phone.test(params.phone)){
      message.phone = '（手機 格式不正確）';
      errorpoint++;
    }
    if (params.birthday === ''){
      message.birthday = '（輸入不能為空值）';
      errorpoint++;
    }
    if (params.email === ''){
      message.email = '（輸入不能為空值）';
      errorpoint++;
    } else if (!email.test(params.email)){
      message.email = '（email 格式不正確）';
      errorpoint++;
    }
    if (params.password === ''){
      message.password = '（輸入不能為空值）';
      errorpoint++;
    } else if (!password.test(params.password)){
      message.password = '（密碼必須包含數字、大小寫，至少8位數）';
      errorpoint++;
    }
    if ( typeof params.sex === 'undefined'){
      message.sex = '（請選擇性別）';
      errorpoint++;
    }
    if (errorpoint > 0){
      await ctx.render('regist.ejs', { message: message, inputvalues: params });
    } else {
      await this.ctx.service.member.createData(params);
      await ctx.redirect('/member/1');
    }
  }
  async alter(){
    const { ctx } = this;
    const params = this.ctx.request.body;
    if (Object.keys(params).length !== 0){
      const member = await this.app.model.Member.findOne({
        where: { member_id: params.id },
      });
      await ctx.render('alter.ejs', { member: member });
    } else {
      const member = await this.ctx.service.member.pageData('1');
      const count = await this.ctx.service.member.getCount();
      await ctx.render('index.ejs', { member: member, page: count, message: '請選擇修改項目' });
    }
  }
  async update(){
    const { ctx } = this;
    const params = this.ctx.request.body;
    const fullchinese = /^[\u4e00-\u9fa5]+$/;
    const email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z] {2,4} )$/;
    const phone = /^[0-9] {10} $/g;
    const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S] {8,16} $/;
    let errorpoint = 0;
    const message = {};
    if (params.name === ''){
      message.name = '（輸入不能為空值）';
      errorpoint++;
    } else if (!fullchinese.test(params.name)){
      message.name = '（名稱只能輸入中文）';
      errorpoint++;
    }
    if (params.phone === ''){
      message.phone = '（輸入不能為空值）';
      errorpoint++;
    } else if (!phone.test(params.phone)){
      message.phone = '（手機 格式不正確）';
      errorpoint++;
    }
    if (params.birthday === ''){
      message.birthday = '（輸入不能為空值）';
      errorpoint++;
    }
    if (params.email === ''){
      message.email = '（輸入不能為空值）';
      errorpoint++;
    } else if (!email.test(params.email)){
      message.email = '（email 格式不正確）';
      errorpoint++;
    }
    if (params.password === ''){
      message.password = '（輸入不能為空值）';
      errorpoint++;
    } else if (!password.test(params.password)){
      message.password = '（密碼必須包含數字、大小寫，至少8位數）';
      errorpoint++;
    }
    if (errorpoint > 0){
      await ctx.render('alter.ejs', { message: message, inputvalues: params });
    } else {
      await this.ctx.service.member.updateData(params);
      await ctx.redirect('/member/1');
    }
  }
  async comfirm(){
    const { ctx } = this;
    const params = this.ctx.request.body;
    if (Object.keys(params).length !== 0){
      const member = await this.app.model.Member.findOne( {
        where: { member_id: params.id },
      });
      await ctx.render('comfirm.ejs', { member: member });
    } else {
      const member = await this.ctx.service.member.pageData('1');
      const count = await this.ctx.service.member.getCount();
      await ctx.render('index.ejs', { member: member, page: count, message: '請選擇刪除項目'} );
    }
  }
  async delete(){
    const { ctx } = this;
    const params = this.ctx.request.body;
    await this.ctx.service.member.deleteData(params);
    await ctx.redirect('/member/1');
  }
}

module.exports = indexController;