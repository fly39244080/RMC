import 'assets/styles/index.less';
import 'assets/styles/img-slide-banner.less';
console.log(config.xmlAjax);

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
 
},'imageSlider');

var sourcesList = [{
    img:'static/images/course01.png',
    title:'C#.NET高级软件工程师',
    time:'每周1~6 10:00~11:00',
    teacher:'Zilor'
},{
    img:'static/images/course01.png',
    title:'C#.NET高级软件工程师',
    time:'每周1~6 10:00~11:00',
    teacher:'Zilor'
},{
    img:'static/images/course01.png',
    title:'C#.NET高级软件工程师',
    time:'每周1~6 10:00~11:00',
    teacher:'Zilor'
},{
    img:'static/images/course01.png',
    title:'C#.NET高级软件工程师',
    time:'每周1~6 10:00~11:00',
    teacher:'Zilor'
},{
    img:'static/images/course01.png',
    title:'C#.NET高级软件工程师',
    time:'每周1~6 10:00~11:00',
    teacher:'Zilor'
},{
    img:'static/images/course01.png',
    title:'C#.NET高级软件工程师',
    time:'每周1~6 10:00~11:00',
    teacher:'Zilor'
}];

var sctemplate = `<ul class="sources-list">
      <% sourcesList.forEach(function(source){ %> 
        <li>
            <img src="<%= source.img %>" />
            <span class="title"><%=source.title%></span>
            <span class="time"><%=source.time%></span>
            <span>主讲：<%=source.teacher%></span>
        </li>
      <% }) %>
    </ul>`;
var schtml = ejs.render(sctemplate, { sourcesList: sourcesList });
document.getElementById('sourcesFrame').innerHTML = schtml;  


$(window).load(function () {
    $('.imgs-slides-out').mySingleScroll({
        speed: 2000
    });
});


// config.ajaxFun({
//     url:'/api/getColorOrsize',
//     type:'get'
// },function(data){
//     console.log(data);
// })



