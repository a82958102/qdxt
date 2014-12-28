/**
 * Created by 440S on 2014/12/23.
 */
var url_user="http://192.168.0.192/loginAdmin.do";
var get_name='http://192.168.0.192/gatloginuser.do';
$(function(){
    if ($.cookie("rmbUser") == "true") {
        $("#ck_rmbUser").val("on");
        $("#username").val($.cookie("username"));
        $("#password").val($.cookie("password"));
        login();
    }
$("#login_sub").click(function(){
    login();
})

$("#login_out").click(function(){
    login_out();
})

});


function login(){


    $.mobile.loading("show");

    var str_username = $("#username").val();
    var str_password = $("#password").val();
    $.cookie("rmbUser", "true", { expires: 7 }); //存储一个带7天期限的cookie
    $.cookie("username", str_username, { expires: 7 });
    $.cookie("password", str_password, { expires: 7 });

    if ($("#auto_login").val()=='on') {
        var str_username = $("#username").val();
        var str_password = $("#password").val();
        $.cookie("rmbUser", "true", { expires: 7 }); //存储一个带7天期限的cookie
        $.cookie("username", str_username, { expires: 7 });
        $.cookie("password", str_password, { expires: 7 });
    }
    else {
        $.cookie("rmbUser", "false", { expire: -1 });
        $.cookie("username", "", { expires: -1 });
        $.cookie("password", "", { expires: -1 });
    }


    var params = {};
    var _url = url_user;
    if ($("#username").val()&&$("#username").val()) {
        params.username = $("#username").val();
        params.password = $("#password").val();
        $.ajax({
            type : "get",
            async : false,
            url : _url, //实际上访问时产生的地址为: ajax.ashx?callbackfun=jsonpCallback&id=10
            data :params,
            cache : false, //默认值true
            dataType : "jsonp",

            //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            //如果这里自定了jsonp的回调函数，则success函数则不起作用;否则success将起作用
            success : function(data){
                $.mobile.loading('hide');
              //  var data = $.parseJSON(json.toString());
                if(data.login==0){
                    login_success();
                }
                if(data.login==1){
                    //  $("#usererror").css("visibility","visible");
                }
                if(data.login==2){
                    //   $("#passworderror").css("visibility","visible");
                }
            },
            error:function(json){
                alert(json.login);
                $.mobile.loading('hide');
                var data = $.parseJSON(json.toString());

                if(data.login==0){
                    login_success();

                }
                if(data.login==1){
                    //  $("#usererror").css("visibility","visible");
                }
                if(data.login==2){
                    //   $("#passworderror").css("visibility","visible");
                }
            }
        });
    }

}

function   login_success(){
    $.get(
        get_name,
        function cbf(data){
            user=data.user;
            $(".login_from").hide();
            $(".login_success").show();
            $(".login_success span").html(data.user.name);
        },
        'jsonp'
    );


}
var login_out_url='http://192.168.0.192/logout.do';
function login_out(){
    $.get(
        login_out_url,
        function cbf(data){
            if(data.login="0"){
                $(".login_from").show();
                $(".login_success").hide();
                $(".login_success span").html("");
            }
        },
        'jsonp'
    );

}





