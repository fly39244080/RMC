import 'assets/styles/about.less';
import imgLayout from '../utils/imgWater.js';
var $companyHistory = $('#companyHistory');
$companyHistory.find('li').on('click',function(ev){
    var tet = $(this).find('span').html();
    $(this).addClass('current').siblings('li').removeClass('current');
    $companyHistory.find('.history-detail').html(tet);
});
$companyHistory.find('li').eq(0).trigger('click');

window.onload = function(){
    imgLayout();
}

window.onresize = function(){
    imgLayout();
}