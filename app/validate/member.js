'use strict'

module.exports = app => {
  const { validator } = app;
  const fullchinese = /[^\u4e00-\u9fa5]/;
  const email = /([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})/;
  const phone = /\d/g;
  const password = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w]{8,16}/;
  const identity = /[A-Za-z][1-2][0-9]{8}/;
  const address = /\D*[縣市]+\D*[鄉鎮村里區]+\D*[大道街路]+.*[號]/;

  validator.addRule('namecheck', ( rule, value )=>{
    if (value === '') {
      return '100 （輸入不能為空值）';
    } else if (fullchinese.test(value)) {
      return '100 （名稱只能輸入中文）';
    }
  });
  validator.addRule('sexcheck', ( rule, value )=>{
    if (value === '') {
      return '101 （請選擇性別）';
    }
  });
  validator.addRule('phonecheck', ( rule, value )=>{
    if (value === '') {
      return '102 （輸入不能為空值）';
    } else if (!phone.test(value)) {
      return '102 （手機只能輸入數字）';
    } else if (value.length !== 10) {
      return '102 （手機長度為10碼）';
    }
  });
  validator.addRule('birthdaycheck', ( rule, value )=>{
    if (value === '') {
      return '103 （輸入不能為空值）';
    }
  });
  validator.addRule('emailcheck', ( rule, value )=>{
    if (value === '') {
      return '104 （輸入不能為空值）';
    } else if (!email.test(value)) {
      return '104 （email格式不符）';
    }
  });
  validator.addRule('passwordcheck', ( rule, value )=>{
    if (value === '') {
      return '105 （輸入不能為空值）';
    } else if (!password.test(value)) {
      return '105 （密碼必須包含數字、大小寫，至少8位數）'
    }
  });
  validator.addRule('identitycheck', ( rule, value )=>{
    if (value === '') {
      return '106 （輸入不能為空值）';
    } else if (value.length !== 10) {
      return '106 （身分證長度不正確）'
    } else if (!identity.test(value)) {
      return '106 （身分證格式不符）'
    }
  });
  validator.addRule('addresscheck', ( rule, value )=>{
    if (value === '') {
      return '107 （輸入不能為空值）';
    } else if (!address.test(value)) {
      return '107 （地址格式不符）';
    }
  });
};