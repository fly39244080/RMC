import 'assets/styles/news.less';
import Pager from '../utils/pager.js';


var pager = new Pager({
    total: 100,
    onPageChange: function(page) {
        console.log(`加载第` + page + "页的数据");
    }
});
