import reportImg from '../images/sign/frontweb.png';
import 'assets/styles/net.less';
var $netReport = $('#netReport');

$netReport.find('img').attr('src',reportImg);

$('#btnTryLesson').on('click',function(){
    location.href = '/audition.html';
})
