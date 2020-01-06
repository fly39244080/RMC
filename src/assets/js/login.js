import '../styles/login.less'
import $ from 'jquery'
$(function(){
    // 验证码倒计时长
    var countNum = 60
    // 定义一个flag判断是否已经触发定时器
    var doing = false;
    var timer = undefined
    // 密码登录模块手机号和密码的检测标识
    var passFlag = {
        phoneFlag:false,
        pwFlag:false
    }
    // 短信登录模块的检测标识
    var messageFlag = {
        phoneFlag:false,
        capFlag:false
    }
    $("#passwordLogin").click(function(){
        $(this).addClass('active-li').siblings('#messageLogin').removeClass('active-li')
        $(".password").show().siblings(".message").hide()
        // 让短信登录页回归原始状态
        initMessage()
    })
    $("#messageLogin").click(function(){
        $(this).addClass('active-li').siblings('#passwordLogin').removeClass('active-li')
        $(".password").hide().siblings(".message").show()
        // 让密码登录页回归到原始状态
        initPass()
    })
    $("#passPhoneTip").bind("input propertychange",function(event){
        var num = $("#passPhoneTip").val()
        passFlag.phoneFlag = /^1[3456789]\d{9}$/.test(num)
        passFlag.phoneFlag ? $(".phone-error-tip").hide() : $(".phone-error-tip").show()
      });
    $("#passWordTip").bind("input propertychange",function(event){
        var numPass = $("#passWordTip").val()
        passFlag.pwFlag = /^(\w){6,12}$/.test(numPass)
        passFlag.pwFlag ? $(".pass-error-tip").hide() : $(".pass-error-tip").show()
    });
    $("#msgPhoneTip").bind("input propertychange",function(event){
        var num = $("#msgPhoneTip").val()
        messageFlag.phoneFlag = /^1[3456789]\d{9}$/.test(num)
        messageFlag.phoneFlag ? $(".msg-error-tip").hide() : $(".msg-error-tip").show()
    });
    $("#getPleaseCapture").bind("input propertychange",function(event){
        var num = $("#getPleaseCapture").val()
        messageFlag.capFlag = /^\d{4}$/.test(num)
        messageFlag.capFlag ? $(".cap-error-tip").hide() : $(".cap-error-tip").show()
    });
    // 点击获取验证码的处理
    $("#getCapture").click(function(){
        // 手机号不通过的时候不触发倒计时并且提示
        if(!messageFlag.phoneFlag){
            $(".msg-error-tip").show()
            return;
        }
        // 正在验证码倒计时不往下执行
        if(doing){
            return;
        }
        doing = true;
        $(this).text(countNum)
        timer = setInterval(()=>{
            countNum--
            if(countNum == 0){
                initInterval()
                return;
            }
            $(this).text(countNum)
        },1000)
    })
    // 点击登录的时候
    $(".login-btn").click(function(){
        // 判断当前登录是密码登录还是短信登录
        var loginAttr = $(".active-li").attr('id')
        // 当是密码登录的时候
        if(loginAttr == 'passwordLogin'){
            // 判断错误提示标识
            if(!passFlag.phoneFlag){
                $(".phone-error-tip").show()
            }
            if(!passFlag.pwFlag){
                $(".pass-error-tip").show()
            }
            if(passFlag.phoneFlag && passFlag.pwFlag){
               console.log('密码登录掉后台接口');
               
            }
        }else{
        // 当是短信登录的时候
            if(!messageFlag.phoneFlag){
                $(".msg-error-tip").show()
            }
            if(!messageFlag.capFlag){
                $(".cap-error-tip").show()
            }
            if(messageFlag.phoneFlag && messageFlag.capFlag){
                console.log('短信登录掉后台接口');
            }
        }
        
    })

    // 密码登录页初始化
    function initPass(){
        $("#passPhoneTip").val('')
        $("#passWordTip").val('')
        $(".phone-error-tip").hide()
        $(".pass-error-tip").hide()
        passFlag.phoneFlag = false
        passFlag.pwFlag = false
    }
    // 短信登录页初始化
    function initMessage(){
        $("#msgPhoneTip").val('')
        $("#getPleaseCapture").val('')
        $(".msg-error-tip").hide()
        $(".cap-error-tip").hide()
        messageFlag.phoneFlag = false
        messageFlag.capFlag = false
        initInterval()
    }
    // 倒计时初始化
    function initInterval(){
        doing = false;
        countNum = 60
        clearInterval(timer)
        $("#getCapture").text('获取验证码')
    }
})