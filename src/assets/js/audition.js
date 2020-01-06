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
