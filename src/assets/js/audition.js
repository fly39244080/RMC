import 'assets/styles/audition.less';

var $stepDetail = $('#stepDetail');
$stepDetail.find('.to-register').on('click',function(ev){
    var phone = $stepDetail.find('.mobile').val();
    if(!/(^1[3|5|7|8|9][0-9]{9}$)/.test(phone)){ 
        createMessTipWin.tipMsg('请输入正确的手机号！');
        return;
    }

    location.href="register.html?mobile="+phone;
})