import 'assets/styles/audition.less';
import 'assets/styles/img-slide-banner.less';

//首页大图轮播,单独打一个包方便cdn缓存
require.ensure([], function(){
    let imageSlide = require('assets/utils/image_show_slider');
    var bannerBox = document.getElementById('bannerBox');
    let imgCount=bannerBox.querySelectorAll('li').length;
   
    if(imgCount>0) {
        bannerBox.querySelectorAll('li')[0].style.zIndex = 2;
        let runimg=new imageSlide.runImg('bannerBox','30',imgCount);
        runimg.info();
    }

},'imageSlider2');

var $stepDetail = $('#stepDetail');
$stepDetail.find('.to-register').on('click',function(ev){
    var phone = $stepDetail.find('.mobile').val();
    if(!/(^1[3|5|8][0-9]{9}$)/.test(phone)){ 
        createMessTipWin.tipMsg('请输入正确的手机号！');
        return;
    }

    location.href="register.html?mobile="+phone;
})