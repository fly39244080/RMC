function cloneObj(oldObj) { //复制对象方法
        if (typeof(oldObj) != 'object') return oldObj;
        if (oldObj == null) return oldObj;
        var newObj = new Object();
        for (var i in oldObj)
            newObj[i] = cloneObj(oldObj[i]);
        return newObj;
    };

    function extendObj() { //扩展对象
        var args = arguments;
        if (args.length < 2) return;
        var temp = cloneObj(args[0]); //调用复制对象方法
        for (var n = 1; n < args.length; n++) {
            for (var i in args[n]) {
                temp[i] = args[n][i];
            }
        }
        return temp;
    }

    function runImg(bigboxID,minRange,count) {
        this.minRange = Number(minRange);
        this.count=count;  //存放图片个数
        this.bigbox= document.getElementById(bigboxID), //最外层容器
            this.ready_moved = true;
        this.imglist= this.bigbox.getElementsByTagName("ul")[0].children;
    }
    runImg.prototype = {
        boxul: null, //子容器ul
        imglist: null, //子容器img
        numlist: null, //子容器countNum
        prev: 0, //上次显示项
        index: 0, //当前显示项
        timer: null, //控制图片转变效果
        play: null, //控制自动播放
        $: function(obj) {
            if (typeof(obj) == "string") {
                if (obj.indexOf("#") >= 0) {
                    obj = obj.replace("#", "");
                    if (document.getElementById(obj)) {
                        return document.getElementById(obj);
                    } else {
                        alert("没有容器" + obj);
                        return null;
                    }
                } else {
                    return document.createElement(obj);
                }
            } else {
                return obj;
            }
        },
        //初始化
        info: function() {
            var ul = this.$("ul");
            for (var j = 1; j <= this.count; j++) {
                var li = this.$("li");
                //li.innerHTML = j;
                ul.appendChild(li);
            }
            this.bigbox.appendChild(ul);
            this.boxul = this.bigbox.getElementsByTagName("ul");
            this.boxul[1].className = "countNum";
            this.numlist = this.boxul[1].getElementsByTagName("li");
            this.boxul[1].style.left=(document.body.scrollWidth - this.count * 25)/2+'px';

            for (var j = 0; j < this.count; j++) {
                this.alpha(j, 0);
            }
            this.alpha(0, 100);
            this.numlist[0].className = "current";
            this.action();
        },
        //封装程序入口
        action: function() {
            // var redirect=globalFun.browserRedirect();
            this.autoplay();
            this.mouseoverout();
            // 这里不用考虑手机页面
            // if(redirect=='mobile') {
            //     this.bindTouchEvn();
            // }
        },
        //在样式表中设置好 .fadeIn 的透明度为0
        fadeIn: function(e) {
            e.classList.add("fadeIn")
        },
        fadeOut: function(e) {
            Array.prototype.forEach.call(e, function(e) {
                e.className = "";
            })
        },
        //图片切换效果
        imgshow: function() {
            clearInterval(this.timer);
            var pralpha = 100;
            var inalpha = 0;

            for (var i = 0; i < this.numlist.length; i++) {
                this.numlist[i].className = "";
                this.imglist[i].className="";
            }
            this.numlist[this.index].className = "current";
            this.imglist[this.index].className="active";

            for (var j = 0; j < this.count; j++) {
                this.alpha(j, 0);
            }
            // 利用透明度来实现切换图片
            this.timer = setInterval(function() {
                inalpha += 2;
                pralpha -= 2;
                if (inalpha > 100) {
                    inalpha = 100
                }; //不能大于100
                if (pralpha < 0) {
                    pralpha = 100
                };
                //为兼容性赋样式
                // this.alpha(this.prev, pralpha);
                this.alpha(this.index, inalpha);
                if (inalpha == 100 && pralpha == 0) {
                    clearInterval(this.timer)
                }; //当等于100的时候就切换完成了
            }.bind(this), 20)
        },
        //设置透明度
        alpha: function(i, opacity) {
            this.imglist[i].style.opacity = opacity / 100;
            this.imglist[i].style.filter = "alpha(opacity=" + opacity + ")";
        },
        //自动播放
        autoplay: function() {

            if (this.play) {
                clearInterval(this.play);
            }
            this.play = setInterval(function() {
                this.prev = this.index;
                this.index++;
                if (this.index > this.count - 1) {
                    this.index = 0
                };
                this.imgshow();
            }.bind(this), 5000) //循环播放图片
        },
        //处理鼠标事件
        mouseoverout: function() {
            var $this = this;
            $this.bigbox.onmouseover = function(event) {
                clearInterval($this.play);
            }
            $this.bigbox.onmouseout = function() {
                $this.autoplay($this.index);
            }

            //鼠标移入下面的小圆点，图片停止播放，显示当前大图
            for (var i = 0,len=$this.numlist.length; i < len; i++) {
                (function(i) {
                    $this.numlist[i].index = i;
                    $this.numlist[i].onmouseover = function(event) {
                        clearInterval($this.play);

                        // 阻止事件冒泡
                        var e=window.event||event;
                        if(document.all){  //只有ie识别
                            e.cancelBubble=true;
                        }else{
                            e.stopPropagation();
                        }

                        if (typeof e.target != 'undefined'){
                            $this.index=e.target.index; //获取鼠标移入的序列
                        }
                        else {
                            $this.index=e.srcElement.index;
                        }

                        $this.imgshow();
                    }
                })(i)
            }
        },
        bindTouchEvn:function() {
            this.boxul[0].addEventListener('touchstart', this.touchstart.bind(this), false);
            this.boxul[0].addEventListener('touchmove', this.touchmove.bind(this), false);
            this.boxul[0].addEventListener('touchend', this.touchend.bind(this), false);
        },
        touchstart: function(e) {
            if (this.ready_moved) {
                var touch = e.touches[0];
                this.touchX = touch.pageX;
                this.ready_moved = false;
                clearInterval(this.play); //触摸图片开始就终止图片的循环播放
            }
        },
        touchmove: function(e) {
            // e.preventDefault();
            var minRange = this.minRange;
            var touchX = this.touchX;
            var imgs_count = this.count;

            if (!this.ready_moved) {

                var release = e.changedTouches[0];
                var releasedAt = release.pageX;
                // 判断滑动的方向
                if (releasedAt + minRange < touchX) {
                    this.ready_moved = true;
                    if (this.index >= (imgs_count - 1)) {
                        this.index = 0;
                    }
                    else {
                        this.index++;
                    }

                    this.imgshow(this.index);

                } else if (releasedAt - minRange > touchX) {
                    if (this.index <= 0) {
                        this.index = imgs_count
                    }
                    this.index--;
                    this.imgshow(this.index);
                    this.ready_moved = true;
                }
            }

        },
        touchend: function(e) {
            // e.preventDefault();
            var minRange = this.minRange;
            var touchX = this.touchX;
            var imgs_count = this.count;
            if (!this.ready_moved) {
                var release = e.changedTouches[0];
                var releasedAt = release.pageX;
                if (releasedAt + minRange < touchX) {
                    this.ready_moved = true;
                    if (this.index > (imgs_count - 1)) {
                        this.index = 0;
                    }
                    else {
                        this.index++;
                    }

                    this.imgshow(this.index);

                } else if (releasedAt - minRange > touchX) {
                    if (this.index <= 1) {
                        this.index = imgs_count + 1
                    }
                    this.index--;
                    this.imgshow(this.index);
                    this.ready_moved = true;
                }
            }
            this.autoplay(this.index); //触摸离开以后再开始循环播放图片
        }
    }

    function startMarqueeImg(option) {
        //speed：移动速度
        //delay：停留时间
        var defaultsOpt={
            element:'noticeList',
            lw:'',
            speed:'80',  //移动的速度
            delay:'4000',  //移动后停留的时间
            IntervalTimer:null,  //定时器
            moveingTag:true
        };
        this.options = extendObj(defaultsOpt, option);
        this.$leftArrow = document.getElementById(this.options.leftArrow); //左箭头
        
        this.$rightArrow = document.getElementById(this.options.rightArrow); //右箭头
        this.scrollDom = document.getElementById(this.options.element);
        this.options.lw=this.scrollDom.parentElement.clientWidth;  //可视区域的宽度
        this.$parentDom = this.scrollDom.parentElement;

      
    }
    startMarqueeImg.prototype.init = function(){ 
        this.scrollDom.innerHTML += this.scrollDom.innerHTML;
        this.scrollDom.style.marginLeft = 0;
        this.start();
        
        this.$parentDom.onmouseover = (ev)=>{
            // console.log('溢入');
            this.options.moveingTag = false;
            clearInterval(this.options.IntervalTimer);
        };
        
        this.$parentDom.onmouseenter = (ev)=>{
            this.options.moveingTag = true;
            this.start();
        };
        this.$leftArrow.onclick = ()=>{
            clearInterval(this.options.IntervalTimer);
            this.start('ltr');
        }
        this.$rightArrow.onclick = ()=>{
            clearInterval(this.options.IntervalTimer);
            this.start();
        } 
    }
    startMarqueeImg.prototype.start = function(dir){
        this.options.IntervalTimer = setInterval(()=>{
            this.moveing(dir);
        }, 1);
    }
    startMarqueeImg.prototype.moveing = function(dir) {
        //从左往右滚动是left在加1， 从右往左是left在减1
        
        var dis = (dir=='ltr')? 1 :-1; 
        //通过改变 element 这个dom的left去使 图片滚动 ，
        var moveLeft = parseInt(this.scrollDom.style.marginLeft);
        moveLeft = (Math.abs(moveLeft)>=this.options.slideFullWid-this.options.lw)?0:moveLeft;
         //判断如果moveLeft增加到 element的最大宽度时候， 重置为0
        var oneSlideWid = this.options.lw/4;
        this.scrollDom.style.marginLeft = moveLeft +dis + "px";
       
         //每次只滚动一个图片 就停一下
        if(moveLeft%oneSlideWid==0){
            //代表移动了一张图片的距离
          clearInterval(this.options.IntervalTimer);
          setTimeout(()=>{
            this.options.moveingTag && this.start();
          },this.options.delay)
        } 
    }

module.exports = {
    runImg:runImg,
    startMarqueeImg
};







