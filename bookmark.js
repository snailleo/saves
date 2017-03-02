//git@git.oschina.net:webappl/marsChocolate.git
//https://git.oschina.net/webappl/maxFactorx2

var react = {
	'saga中文' : 'http://leonshi.com/redux-saga-in-chinese/docs/basics/UsingSagaHelpers.html',
	'dva' : 'https://github.com/dvajs/dva-docs/blob/master/v1/zh-cn/getting-started.md',
	'dva-tutorial' : 'https://github.com/dvajs/dva-docs/tree/master/v1/zh-cn/tutorial',
    'react教程' : 'http://react-china.org/t/react/8696';
}

var angular = {
    '教程汇总' : 'http://www.jb51.net/special/555.htm',
    'jiaocheng' : 'http://www.jb51.net/special/437.htm'
}

var vue = {
	'vue2': 'http://vuefe.cn/guide/render-function#基础',
	'vue-toute2.0': 'http://router.vuejs.org/zh-cn/essentials/getting-started.html',
	'vue-route2.0实例': 'http://blog.csdn.net/bboyjoe/article/details/52804988',
    'vue-strap':'http://yuche.github.io/vue-strap/',

    'allselect':'https://segmentfault.com/q/1010000004003248/a-1020000004006124';
}

var css = {
	'checkbox美化' : 'http://www.html5tricks.com/demo/jiaoben1503/index.html'
}

var ES6 = {
	'es6教程' : 'http://es6.ruanyifeng.com/',
}

var FE = {
    'w3ctech': 'https://www.w3ctech.com/',
    'FE UED 数据管理平台' : 'http://fe.social-touch.com:30082/org/index.do',
    '时趣SCRM' : 'http://biz.social-touch.com/User/Index/index?ST_AID=2',//u:yanshi@social-touch.comm;p:yanshi
    'svn' : 'svn://211.151.70.29/svn/ued',
    'vueui' : 'http://ui.social-touch.com/quickstart',
}

var 微信小程序 = 'https://mp.weixin.qq.com/debug/wxadoc/introduction/index.html?t=201715';


//数组去重：
let arr = [1,'a',undefined,null,NaN,1,'a',undefined,null,NaN];
Array.prototype.remDub = Array.prototype.remDub || function () {
    //return Array.from(new Set(this));
    return [...new Set(this)];
};

//cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    var path = '/';
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires+"; path=" + path ;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}