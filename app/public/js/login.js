
$(document).ready(function() {
  let minLength = 3;
  let $accountFeedback = $('#accountFeedback');
  let $passwordFeedback = $('#passwordFeedback');

  $(document).on('keyup' ,'#account' , function() {
    let accountLen = $(this).val().length;
    
    if (accountLen == 0) {
      $accountFeedback.html('帳號長度至少 ' + minLength + ' 個字元');
    } else if  (accountLen < minLength) {
      $accountFeedback.html('帳號長度不夠');
    } else {
      $accountFeedback.html('');
    }
  });

  $(document).on('keyup' ,'#password' , function() {
    let passwordLen = $(this).val().length;
    
    if (passwordLen == 0) {
      $passwordFeedback.html('密碼長度至少 ' + minLength + ' 個字元');
    } else if  (passwordLen < minLength) {
      $passwordFeedback.html('密碼長度不夠');
    } else {
      $passwordFeedback.html('');
    }
  });

  if(document.getElementById('message')) {
    alert(document.getElementById('message').value);
  }
})