import '../styles/register.less'
import $ from 'jquery'
import {getUrlParam} from '../utils/getUrlParam'
$(function(){
    // 先读取地址栏上的mobile的值 读取到的话就放在手机号的输入框里
    var res = getUrlParam('mobile')
    if(res){
        // 防止用户跳到注册页面后随意篡改手机号码
        var resNum = /^1[3456789]\d{9}$/.test(res)
        resNum &&  $("#regPhone").val(res)
    }
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

    // 点击获取验证码的处理
    $("#getCapture").click(function(){
        // 可能存在用户是由试听页面跳转过来的这个时候要先拿到手机号去验证一下
        var numRes = $("#regPhone").val()
        if( numRes && /^1[3456789]\d{9}$/.test(numRes)){
            regFlag.phoneFlag = true
        }
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
        // $(this).text(countNum)
        // timer = setInterval(()=>{
        //     countNum--
        //     if(countNum == 0){
        //         initInterval()
        //         return;
        //     }
        //     $(this).text(countNum)
        // },1000)
        $(".verBox").show()
        $(".verBox").addClass("infinite")
        setTimeout(()=>{
            $(".verBox").removeClass("infinite")
        },500)
        // 加一个滑块验证码验证
        imgVer({
            el:'$("#imgVer")',
            width:'260',
            height:'116',
            img:[
                './static/images/login/ver.png',
                './static/images/login/ver-1.png',
                './static/images/login/ver-2.png',
                './static/images/login/ver-3.png'
            ],
            success:function () {
                doing = true
                setTimeout(()=>{
                    $(".verBox").hide()
                },500)
                $("#getCapture").text(countNum)
                timer = setInterval(()=>{
                    doing = true
                    countNum--
                    if(countNum == 0){
                        initInterval()
                        return;
                    }
                    $("#getCapture").text(countNum)
                },1000)
                
            },
            error:function () {
                //alert('错误执行')
            },
            wrong:function(){
                doing = false;
                $("#wrong").click(function(){
                    $(".verBox").hide()
                })
            }
    
        });
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
        if(regFlag.phoneFlag && regFlag.capFlag && regFlag.passFlag && regFlag.qqFlag){
            console.log('成功注册掉后台接口');
        }

    })
})