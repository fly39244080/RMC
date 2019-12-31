import 'assets/styles/index.less';
console.log(config);




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
// config.ajaxFun({
//     url:'/api/getColorOrsize',
//     type:'get'
// },function(data){
//     console.log(data);
// })



