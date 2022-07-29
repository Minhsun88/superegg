'use strict';
const Service = require('egg').Service;

class managerService extends Service {  
  async getData(params) {  
    if(params.account === "") { 
      return { msg: '帳號不能為空' };
    } else if (params.password === "") {  
      return { msg: '密碼不能為空', account:params.account };
    } else { 
      const data = await this.app.model.Manager.findOne({ 
        where: { account: params['account'] }
      });
      if(data === null) { 
        return { msg: '此帳號尚未註冊', account: params.account, password: params.password };
      }else if(params.password !== data.password) { 
        return { msg: '密碼錯誤', account: params.account, password: params.password };
      }else { 
        return true;
      }
    }
  }
}
 
module.exports = managerService;