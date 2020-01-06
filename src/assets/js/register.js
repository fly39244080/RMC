import '../styles/register.less'
import $ from 'jquery'
$(function(){
    // 验证码倒计时长
    var countNum = 60
    // 定义一个flag判断是否已经触发定时器
    var doing = false
    var timer = undefined
    var regFlag = {
        phoneFlag:false,
        capFlag:false,
        passFlag:false,
        qqFlag:false,
        classFlag:false
    }
    // 验证手机号
    $("#regPhone").bind("input propertychange",function(event){
        var num = $("#regPhone").val()
        regFlag.phoneFlag = /^1[3456789]\d{9}$/.test(num)
        regFlag.phoneFlag ? $(".phone-error-tip").hide() : $(".phone-error-tip").show()
    });
    // 验证验证码
    $("#regCap").bind("input propertychange",function(event){
        var num = $("#regCap").val()
        regFlag.capFlag = /^\d{4}$/.test(num)
        regFlag.capFlag ? $(".cap-error-tip").hide() : $(".cap-error-tip").show()
    });
    // 验证密码
    $("#regPass").bind("input propertychange",function(event){
        var num = $("#regPass").val()
        regFlag.passFlag = /^(\w){6,12}$/.test(num)
        regFlag.passFlag ? $(".pass-error-tip").hide() : $(".pass-error-tip").show()
    });
    // 验证qq号
    $("#regQnumber").bind("input propertychange",function(event){
        var num = $("#regQnumber").val()
        regFlag.qqFlag = /[1-9][0-9]{4,}/.test(num)
        regFlag.qqFlag ? $(".qq-error-tip").hide() : $(".qq-error-tip").show()
    });
    // 验证班级
    $("#regClass").bind("input propertychange",function(event){
        var num = $("#regClass").val()
        regFlag.classFlag = /^[0-9]\d{0,1}$/.test(num)
        regFlag.classFlag ? $(".class-error-tip").hide() : $(".class-error-tip").show()
    });

    // 点击获取验证码的处理
    $("#getCapture").click(function(){
        // 手机号不通过的时候不触发倒计时并且提示
        if(!regFlag.phoneFlag){
            $(".phone-error-tip").show()
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
    // 倒计时初始化
    function initInterval(){
        doing = false;
        countNum = 60
        clearInterval(timer)
        $("#getCapture").text('获取验证码')
    }

    // 点击注册的时候
    $("#register").click(function(){
        // 用户上来什么都不填点击了注册按钮
        if(!regFlag.phoneFlag){
            $(".phone-error-tip").show()
        }
        if(!regFlag.capFlag){
            $(".cap-error-tip").show()
        }
        if(!regFlag.passFlag){
            $(".pass-error-tip").show()
        }
        if(!regFlag.qqFlag){
            $(".qq-error-tip").show()
        }
        if(!regFlag.classFlag){
            $(".class-error-tip").show()
        }
        if(regFlag.phoneFlag && regFlag.capFlag && regFlag.passFlag && regFlag.qqFlag && regFlag.classFlag){
            console.log('成功注册掉后台接口');
            
        }

    })
})