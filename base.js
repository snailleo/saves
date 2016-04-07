function ajaxReq(url, data, success, error) {
    if (error == null) {
        error = function() {
            alertMsg("网络异常，请重新登录");
            $.cookie("token", "logout");
            location.href = "login.html";
        }
    }
    if (url.indexOf('http:') == -1) {
        var urlIn = globalUrl + "/dmg/1_3/gym/" + url;
    } else {
        var urlIn = url;
    }
    setTimeout(function() {}, 10);
    data = eval('(' + "{token:'" + $.cookie('token') + "',check_userid:'" + $.cookie("check_userid") + "'," + data + "}" + ')');
    data.gym_id = $.cookie("gym_id");
    var settings = {
        type: 'post',
        url: urlIn,
        data: data,
        success: success,
        error: error
    }
    $.ajax(settings);
}