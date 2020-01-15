import 'assets/styles/about.less';
var $companyHistory = $('#companyHistory');

$companyHistory.find('li').on('mouseenter',function(ev){
    var tet = $(this).find('span').html();
    var num = $companyHistory.find('li').index(this);
    scrollHistaory.num = num;
    $(this).addClass('current').siblings('li').removeClass('current');
    $companyHistory.find('.history-detail').html(tet);
});
$companyHistory.find('li').eq(0).trigger('mouseenter');
$companyHistory.find('li').eq(0).trigger('click');

scrollHistaory.num = 0;
function scrollHistaory(){

    //自动播放
    setInterval(()=>{
        if(scrollHistaory.num==$companyHistory.find('li').length-1) {
            scrollHistaory.num=0;
        } else {
            scrollHistaory.num++;
        }
       
        $companyHistory.find('li').eq(scrollHistaory.num).trigger('mouseenter');
    },3000);
}
scrollHistaory();

