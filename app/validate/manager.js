'use strict'

module.exports = app => {
  const { validator } = app;
  const accountRegex = /(?=.*[A-Z])(?=.*[a-z])[\w]{6,}/;
  const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\$%\^&\*\(\)-\+\\\?\/\.])[\w!@#\$%\^&\*\(\)-\+\\\?\/\.]{9,}/;

  validator.addRule('logincheck', ( rule, value )=>{
    let message = '';
    
    if (!accountRegex.test(value.account)) {
      message = message + '帳號 大於5個字 需有大小寫英文\n';
    }
    if (!passwordRegex.test(value.password)) {
      message =  message + '密碼 大於8個字 需有大小寫英文且需要有一個特殊符號\n';
    }
    if (value.data === null) {
      message = message + '帳號未註冊\n';
    } else if (value.password !== value.data.password) {
      message = message + '密碼錯誤';
    }
    if (message !== '')
    return message;
  });
};