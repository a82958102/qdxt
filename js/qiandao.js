/**
 * Created by 440S on 2014/12/23.
 */
$(function(){
    $("#qd_sub").on('tap',function(){
        qd();
    })
    $("#qt_sub").on('tap',function(){
        qt();
    })
});


var ip_url='http://192.168.0.192';
function qd(){

    $.get(ip_url+"/enterOffice.do",function(data){
        if(data.result == "success"){

            $("#aboutPage").find(".h1_content").html("签到成功");
            $.mobile.changePage('#aboutPage',{
                transition:'slideup'
            });
        }else{
            $("#aboutPage").find(".h1_content").html("已签到");
            $.mobile.changePage('#aboutPage',{
                transition:'slideup'
            });
        }
    },'jsonp');


    }
function qt(){
    $.get(ip_url+"/outOffice.do",function(data){
        if(data.result == "success"){
            $("#aboutPage").find(".h1_content").html("签退成功");
            $.mobile.changePage('#aboutPage',{
                transition:'slideup'
            });
        }else{
            $("#aboutPage").find(".h1_content").html("已签退");
            $.mobile.changePage('#aboutPage',{
                transition:'slideup'
            });
        }
    },'jsonp');

}



