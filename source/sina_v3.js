!
function(a) {
	function b() {
		m.debug && console.log.apply(console, arguments)
	}
	function c(a) {
		b("%cpkg_runner", "color:green;font-size:20px;");
		var c,
		e,
		f,
		g,
		h,
		i = [];
		for (c = 0, e = a.length; e > c; c++) f = a[c],
		"require" != f ? (g = k[f], g ? (l[f] || (h = {
			exports: {}
		},
		l[f] = g.apply(this, [d(f), h.exports, h]) || h.exports), i.push(l[f])) : i.push(void 0)) : i.push(d(f));
		return i
	}
	function d(a) {
		function require(a) {
			if ( - 1 != j.call(a).toLowerCase().indexOf("array")) return i.apply(this, arguments);
			for (b("aaaaaaa", d, a), 0 == a.indexOf(".") && (a = (d + a).replace(/\/\.\//, "/")); - 1 != a.indexOf("../");) a = a.replace(/\w+\/\.\.\//, "");
			if (b("%clocal_require", "color:green;font-size:20px;"), !k[a]) throw "[" + a + "] 依赖未定义!";
			return l[a] || c([a]),
			l[a]
		}
		b("local_require", a);
		var d = a.substr(0, a.lastIndexOf("/") + 1);
		return require.isdefined = g,
		require.config = h,
		require
	}
	function e(a, c, d) {
		function e() {
			if (b("%cloaded:%s, total:%s", "color:green;font-size:20px;", j, a.length), a.length == j) {
				if (k) throw d && d(),
				"以下文件加载失败\n\n" + l.join("\n") + "\n\n";
				c()
			}
		}
		function f(a) {
			var b;
			b = document.createElement("script"),
			b.src = a,
			b.onerror = function() {
				k = !0,
				l.push(b.src),
				j += 1,
				e()
			},
			b.onload = b.onreadystatechange = function() {
				this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (j += 1, e())
			},
			document.getElementsByTagName("head")[0].appendChild(b)
		}
		b("%cglobal_loader", "color:green;font-size:20px;");
		var g,
		h,
		i,
		j = 0,
		k = !1,
		l = [];
		for (g = 0, h = a.length; h > g; g++) i = m.paths[a[g]] ? m.paths[a[g]] : a[g],
		/^\.|^\/|^\w+\:\/\//.test(i) || (i = m.baseUrl + i + ".js"),
		f(i)
	}
	function f(a, b, c) {
		k[a] = c || b
	}
	function g(a) {
		return !! k[a]
	}
	function h(a) {
		var b;
		if (a) {
			if (a.baseUrl && (m.baseUrl = a.baseUrl), a.paths) for (b in a.paths) m.paths[b] = a.paths[b];
			"debug" in a && (m.debug = a.debug)
		}
	}
	function i(a, b, d) {
		function f() {
			var d = c(a);
			b && b.apply(this, d)
		}
		var g,
		h,
		i = [];
		for (g = 0, h = a.length; h > g; g++) k[a[g]] || i.push(a[g]);
		i.length > 0 ? e(i, f, d) : f()
	}
	var j = Object.prototype.toString,
	k = {
		require: !0
	},
	l = {},
	m = {
		baseUrl: "./",
		paths: {}
	};
	f.amd = !0,
	i.config = h,
	i.isdefined = g,
	a.define = f,
	a.require = i
} (this),
define("brick",
function(require, a) {
	require("tpl/card/cards"),
	require("tpl/mod/mods");
	var b = require("sdk/log"),
	c = require("sdk/notice"),
	d = require("sdk/asyncQueue"),
	e = require("sdk/renderHTML"),
	f = require("sdk/runlogic"),
	g = require("sdk/tplutil"),
	h = require("act/controller");
	d.setDelay(0),
	a.notice = c,
	a.render = e.render,
	a.replaceRender = e.replaceRender,
	a.onallRenderReady = e.onallRenderReady,
	a.initLogic = f.init,
	a.onallLogicReady = f.onallLogicReady,
	a.initAct = h.init,
	a.tplutil = g,
	a.setDebug = function(a) {
		b.debug = a
	},
	b.debug = 1
}),
define("tpl/card/cards",
function() {}),
define("tpl/mod/mods",
function() {}),
define("sdk/log",
function(require, a, b) {
	var c = window.console;
	a = b.exports = function() {
		a.debug && c && c.log.apply(c, arguments)
	}
}),
define("sdk/notice",
function(require, a) {
	function b(a) {
		return d[a] || (d[a] = [])
	}
	function c(a, b) {
		if (b.indexOf) return b.indexOf(a);
		for (var c = 0, d = b.length; d > c; ++c) if (b[c] === a) return c;
		return - 1
	}
	var d = {};
	a.has = function(a) {
		var c = b(a);
		return ! (!c || !c.length)
	},
	a.on = function(a, c) {
		b(a).unshift(c)
	},
	a.off = function(a, d) {
		var e,
		f,
		g = b(a);
		d ? (e = c(d, g)) > -1 && (f = 1) : (e = 0, f = g.length),
		f && g.splice(e, f)
	},
	a.trigger = function(a, c, d) {
		var e = b(a),
		f = e.length;
		if (c = [].concat(c || [], d ? d: []), f) for (var g = e.length - 1; g > -1; g--) try {
			e[g] && e[g].apply(void 0, c)
		} catch(h) {
			throw h
		} else d && d()
	}
}),
define("sdk/asyncQueue",
function(require, a, b) {
	function c() {
		function a() {
			b[0].apply(void 0, [c].concat(b[1]))
		}
		var b = e.shift();
		b ? (f = !0, setTimeout(a, g)) : f = !1
	}
	function d() {} {
		var e = [],
		f = !1,
		g = 1; !
		function() {
			var a = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame,
			b = function(a) {
				return setTimeout(a, 2)
			};
			return a && a(function() {
				b = a
			}),
			function(a) {
				return b(function() {
					a()
				})
			}
		} ()
	}
	a = b.exports = function(a, b, h) {
		null === h ? a.apply(void 0, [d].concat(b)) : (e.push([a, b, h || g]), f || c())
	},
	a.setDelay = function(a) {
		g = a
	}
}),
define("sdk/renderHTML",
function(require, a) {
	function b() {--o > 0 || i.trigger(p, m.getAllData())
	}
	function c(a, c) {
		var f = c.length;
		o += f;
		for (var g = 0; f > g; ++g) h(function(a, c, f) {
			if (f.async_api) {
				var g = e("<div></div>");
				c.appendChild(g),
				j(f.async_api,
				function(a) {
					a ? d(c, g, a, b) : b()
				}),
				a()
			} else d(c, null, f,
			function() {
				b(),
				a()
			})
		},
		[a, c[g]], null)
	}
	function d(a, b, d, f) {
		var g = d.card_type || d.mod_type || d.type;
		if (g) {
			var h = d.card_type ? "card/card" + g: g,
			j = "tpl/" + h,
			l = {
				type: g,
				tplid: j,
				logicid: h,
				boxId: k("boxId"),
				box: n,
				data: d
			},
			o = require(j),
			p = o(d),
			r = l.box = e(p);
			i.trigger(q, p);
			var s = r.querySelector("[data-node=cardList]");
			r.id = l.boxId,
			b ? a.replaceChild(r, b) : a.appendChild(r),
			m.setData(l.boxId, l),
			s && d.card_group && c(s, d.card_group)
		}
		f && f()
	}
	function e(a) {
		return g || (g = document.createElement("div"), g.style.display = "none"),
		g.innerHTML = a,
		f(g)
	}
	function f(a) {
		for (var b = a.firstChild; 1 != b.nodeType;) b = b.nextSibling;
		return b
	}
	var g,
	h = require("./asyncQueue"),
	i = require("./notice"),
	j = require("./jsonpData"),
	k = require("./uniqueId"),
	l = require("./runlogic"),
	m = require("./cacheData"),
	n = void 0,
	o = 0,
	p = "--render--all-ready",
	q = "--render--one-html";
	a.render = function(a, b) {
		c(a, b)
	},
	a.replaceRender = function(a, b) {
		for (var d = a.querySelectorAll("[id]"), e = 0, f = d.length; f > e; ++e) {
			var g = d[e].id;
			l.destroy(g),
			m.removeData(g)
		}
		a.innerHTML = "",
		c(a, b)
	},
	a.onallRenderReady = function(a) {
		i.on(p, a),
		o || a(m.getAllData())
	},
	a.ononeHtmlReady = function(a) {
		i.on(q, a)
	}
}),
define("sdk/jsonpData",
function(require, a, b) {
	var c = require("./uniqueId");
	a = b.exports = function(a, b) {
		var d = c(),
		e = !1;
		window[d] = function(a) {
			e || (b(a), e = !0)
		},
		/^(\/|http:\/\/)/.test(a) || (a = location.pathname.replace(/[^\/]*$/, "") + a),
		a += ( - 1 == a.indexOf("?") ? "?": "&") + "callback=" + d,
		require([a], null,
		function() {
			e || (b(!1), e = !0)
		})
	}
}),
define("sdk/uniqueId",
function(require, a, b) {
	var c = 1,
	d = "_"++new Date + "_";
	b.exports = function(a) {
		return (a || "") + d + c++
	}
}),
define("sdk/runlogic",
function(require, a) {
	function b() {--h > 0 || d.trigger(g)
	}
	var c = require("./log"),
	d = require("./notice"),
	e = (require("./uniqueId"), require("./asyncQueue")),
	f = require("./cacheData"),
	g = "--logic--all-ready",
	h = 0;
	a.init = function(a) {
		var d = f.getAllData();
		for (var g in d)++h,
		"logicObj" in d[g] ? b() : (d[g].logicObj = 1, e(function(d, e) {
			var f = e.logicid;
			if (require.isdefined(f)) try {
				e.logicObj = require(f)(e.box, e.data, a)
			} catch(g) {
				c("logic error: " + f, g.message)
			} else c("logic is not defined: " + f);
			b(),
			d()
		},
		[d[g]]))
	},
	a.destroy = function(a) {
		var b = f.getData(a);
		b && b.logicObj && b.logicObj && b.logicObj.destroy && b.logicObj.destroy()
	},
	a.onallLogicReady = function(a) {
		d.on(g, a)
	}
}),
define("sdk/cacheData",
function(require, a) {
	var b = {};
	a.setData = function(a, c) {
		b[a] = c
	},
	a.getData = function(a) {
		return b[a]
	},
	a.getAllData = function() {
		return b
	},
	a.removeData = function(a) {
		b[a] && delete b[a]
	}
}),
define("sdk/tplutil",
function(require, a) {
	a.trim = function() {
		"use strict";
		function a(a) {
			return a.replace(c, "").replace(d, "")
		}
		function b(a) {
			return String.prototype.trim.call(a)
		}
		var c = new RegExp("^[" + e + "]+"),
		d = new RegExp("[" + e + "]+$"),
		e = " \n \f\r   ᠎           ​\u2028\u2029  　﻿";
		return String.prototype.trim ? b: a
	} ()
}),
define("act/controller",
function(require, a) {
	function b(a, b, d) {
		g.on(j + a + b, d),
		c(b)
	}
	function c(a) {
		k[a] || ($(document).on(a, d), k[a] = 1)
	}
	function d(a) {
		var b,
		c = a.target;
		do
		if (b = c.getAttribute && c.getAttribute(i)) {
			b.split(" ").forEach(function(b) {
				g.trigger(j + b + a.type, [a, c, e(c.getAttribute("data-act-data") || "")])
			});
			break
		}
		while (c = c.parentNode)
	}
	function e(a) {
		for (var b = a.split("&"), c = {},
		d = 0, e = b.length; e > d; ++d) if (b[d]) {
			var f = b[d].split("="),
			g = f[0],
			h = f[1] || "";
			c[g] = c[g] ? [].concat(c[g], h) : h
		}
		return c
	}
	var f = require("sdk/log"),
	g = require("sdk/notice"),
	h = require("sdk/renderHTML"),
	i = "data-act-type",
	j = "--act-manager--",
	k = {},
	l = {};
	h.ononeHtmlReady(function(a) {
		a.replace(/ data-act-type="([^"]+)"/g,
		function(a, b) {
			b = b.split(" ");
			for (var c = 0, d = b.length; d > c; ++c) l[b[c]] = l[b[c]] || {}
		})
	}),
	a.init = function() {
		for (var a in l) !
		function(a) {
			l[a].events || require(["act/" + a],
			function(c) {
				if (!c) return void f("act/" + a + " is undefined!");
				var d = c.events,
				e = l[a].events = {};
				for (var g in d) for (var h = g.split(" "), i = 0, j = h.length; j > i; ++i) b(a, h[i], e[h[i]] = d[g])
			})
		} (a)
	}
}),
define("tpl/card/card10",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title UT-1 头像文字混排三行三字段 (card10)@category User + Text - 头像文字混排类@readme 头像文字混排三行三字段,支持Card标题,支持趋势投放---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card10 line-around" data-act-type="hover">    <div class="layout-box media-graphic">        <a '), aRet.push(function() {
			var a = require("tpl/common/openTarget");
			return a(data)
		} ()), aRet.push(' class="mod-media size-m">            <div class="media-main">                <img src="' + data.user.profile_image_url + '" data-node="cImgUsr" height="64" width="64"/>                '), aRet.push(function() {
			var a = require("tpl/common/verified");
			return a(data.user)
		} ()), aRet.push("            </div>        </a>        <a "), aRet.push(function() {
			var a = require("tpl/common/openTarget");
			return a(data)
		} ()), aRet.push(' class="box-col item-list">            <div class="item-main txt-m mct-a txt-cut'), !data.desc1, aRet.push('">' + data.user.screen_name + "</div>            "), data.desc1 && (aRet.push('            <div class="item-minor txt-s mct-d txt-cut'), !data.desc2, aRet.push('">' + data.desc1 + "</div>            ")), aRet.push("            "), data.desc2 && aRet.push('                <div class="item-other txt-s mct-d txt-cut">' + data.desc2 + "</div>            "), aRet.push("        </a>        "), data.buttons || data.user && data.user.buttons) {
			if (aRet.push("        "), (data.buttons || data.user && data.user.buttons) && (data.buttons || data.user && data.user.buttons).constructor === Array) with({
				i: 0,
				l: (data.buttons || data.user && data.user.buttons).length,
				btn_index: 0,
				btn: null
			}) for (i = l; i--;) btn_index = l - i - 1,
			btn = (data.buttons || data.user && data.user.buttons)[btn_index],
			aRet.push("            "),
			aRet.push(function() {
				var a = require("tpl/common/button");
				return a(btn)
			} ()),
			aRet.push("        ");
			aRet.push("        ")
		}
		return aRet.push("    </div></div>"),
		aRet.join("")
	}
}),
define("tpl/common/openTarget",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return a && "object" == typeof a ? (b.push(' href="' + (a.urls && a.urls.h5 || a.scheme || a.openurl || "javascript:;") + '" '), b.join("")) : ""
	}
}),
define("tpl/common/verified",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return a && "object" == typeof a ? (a.verified === !0 && "verified_type" in a && 0 == a.verified_type ? b.push('<i class="icon icon-yellowv" data-node="cIconUsr"></i>') : a.verified === !0 && "verified_type" in a && a.verified_type > 0 && a.verified_type < 8 ? b.push('<i class="icon icon-bluev" data-node="cIconUsr"></i>') : a.verified === !1 && "verified_type" in a && 220 == a.verified_type ? b.push('<i class="icon icon-club" data-node="cIconUsr"></i>') : a.verified === !1 && a.level && 10 == a.level ? b.push('<i class="icon icon-vgirl" data-node="cIconUsr"></i>') : a.verified === !1 && a.level && 2 === a.level && b.push('<i class="icon icon-vip" data-node="cIconUsr"></i>'), b.join("")) : ""
	}
}),
define("tpl/common/button",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return a && "object" == typeof a ? (b.push("<a "), b.push(function() {
			var b = require("tpl/common/openTarget");
			return b(a)
		} ()), b.push("  "), b.push(!a.type || "like" !== a.type && "follow" !== a.type ? "default" === a.type && a.params && a.params.action ? '   data-act-type="hover btn_default" data-act-data="action=' + a.params.action + '"  ': '    data-act-type="hover ' + a.type + '"  ': '   data-act-type="hover ' + a.type + '" data-act-data="sub_type=' + a.sub_type + '"  '), b.push(' class="mod-operate'), a.type && b.push(" mod-operate-" + a.type), b.push('"><div class="operate-inner"><div class="inner">    '), a.type && "like" === a.type ? (b.push("        "), b.push(a.sub_type && 1 === a.sub_type ? '        <i class="icon icon-liked"></i>        ': '        <i class="icon icon-like"></i>        '), b.push("    ")) : a.type && "follow" === a.type ? (b.push("        "), b.push(a.sub_type && 1 === a.sub_type ? '        <i class="icon-font icon-font-followed" style="color:#AAA"></i>        <div data-node="cImgTxt" class="txt-xxs" style="color:#AAA">已关注</div>        ': '        <i class="icon-font icon-font-follow"></i>        <div data-node="cImgTxt" class="txt-xxs">加关注</div>        '), b.push("    ")) : (b.push("        "), a.pic && b.push('        <img data-node="cImgPic" src="' + a.pic + '" height="24" width="24"/>        '), b.push('        <div data-node="cImgTxt" class="txt-xxs" >' + a.name + "</div>    ")), b.push("    </div></div></a>"), b.join("")) : ""
	}
}),
define("tpl/card/card11",
function(require, a, b) {
	var c = require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return b.push("<!--info--@title G-1or2 组合类型一 (card11)@category Group - 组合类型@readme G-1or2 组合类型一 ---说明-->"),
		a && "object" == typeof a ? (b.push('<div class="card11'), 1 != a.show_type && b.push(" card-combine"), b.push('" data-node="group">    '), a.title && b.push('    <h3 class="title mct-b txt-xs" data-node="gTitle">' + c.trim(a.title) + "</h3>    "), b.push('    <div data-node="cardList" class="card-list">    </div>    '), a.buttontitle && (b.push('    <div class="more-detail line-around">        <a '), b.push(function() {
			var b = require("tpl/common/openTarget");
			return b(a)
		} ()), b.push(" "), a.actionlog && a.actionlog.act_code && b.push('data-actcode="' + a.actionlog.act_code + '" '), b.push('data-act-type="hover" class="mct-d txt-s">' + a.buttontitle), a.display_arrow && 1 === a.display_arrow && b.push('                <span data-node="arrow" class="plus plus-s">                    <i class="icon-font icon-font-arrow-right txt-xs"></i>                </span>            '), b.push("        </a>    </div>    ")), b.push("</div>"), b.join("")) : ""
	}
}),
define("tpl/card/card13",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return b.push("<!--info--@title W-1 嵌入网页内容 (card13)@category Webview - 网页类@readme 嵌入网页内容---说明-->"),
		a && "object" == typeof a ? (b.push('<div class="card card13 line-around">    <article class="web-article">        <header class="title-box">            <h3 class="title mct-a">' + a.title + '</h3>            <div class="subtitle mct-d txt-xs"><em class="time">2014-02-17 14:20</em><em class="from">新浪微博</em></div>        </header>        <iframe src="' + a.content_url + '" class="main-content" frameborder="0" scrolling="no"></iframe>    </article></div>'), b.join("")) : ""
	}
}),
define("tpl/card/card15",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return b.push("<!--info--@title O-1 热门微博 (card15)@category Other - 其他类@readme 热门微博---说明-->"),
		a && "object" == typeof a ? (b.push('<div class="card card15 line-around">    <a class="layout-box media-graphic" '), b.push(function() {
			var b = require("tpl/common/openTarget");
			return b(a)
		} ()), b.push(' data-act-type="hover">         <div class="mod-media size-m">            <div class="media-main"><img src="' + a.user.profile_image_url + '" height="64" width="64"></div>         </div>                   <div class="box-col item-list">            <div class="item-main txt-m mct-a txt-cut">' + a.title_sub + '</div>            <div class="item-minor txt-s mct-d">' + a.desc1 + "</div>        </div>    </a></div>"), b.join("")) : ""
	}
}),
define("tpl/card/card16",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title L-4 双列分离式 (card16)@category Link - 链接类@readme 双列分离式---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card16 line-around">    <div class="layout-box">    '), data.group && data.group.constructor === Array) with({
			i: 0,
			l: data.group.length,
			group_index: 0,
			group: null
		}) for (i = l; i--;) group_index = l - i - 1,
		group = data.group[group_index],
		aRet.push('        <div class="box-col">        <a class="mct-a txt-cut" '),
		aRet.push(function() {
			var a = require("tpl/common/openTarget");
			return a(group)
		} ()),
		aRet.push(' data-act-type="hover">            <i class="iconimg iconimg-m"><img width="36" height="36" src="' + group.pic + '" alt=""></i><i>' + group.title_sub + "</i>        </a>        </div>");
		return aRet.push("              </div></div>"),
		aRet.join("")
	}
}),
define("tpl/card/card17",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title L-2 双列式（可扩展）(card17)@category Link - 链接类@readme 双列式（可扩展）---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card17 line-around col-' + data.col + '">'), data.group && data.group.constructor === Array) with({
			i: 0,
			l: data.group.length,
			group_index: 0,
			group: null
		}) for (i = l; i--;) group_index = l - i - 1,
		group = data.group[group_index],
		aRet.push('<a class="item-box line-separate" '),
		aRet.push(function() {
			var a = require("tpl/common/openTarget");
			return a(group)
		} ()),
		aRet.push('>        <div class="layout-box">            <div class="mct-a box-col txt-m txt-cut">' + group.title_sub + "</div>"),
		group.corner_mark && aRet.push('            <div><span class="bubble bubble-blue txt-xxs">' + group.corner_mark + "</span></div>"),
		aRet.push("        </div>    </a>");
		return aRet.push("</div>"),
		aRet.join("")
	}
}),
define("tpl/card/card19",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title L-6 四列式 (card19)@category Link - 链接类@readme 四列式---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card19 line-around col-' + data.col + '">'), data.group && data.group.constructor === Array) with({
			i: 0,
			l: data.group.length,
			group_index: 0,
			group: null
		}) for (i = l; i--;) group_index = l - i - 1,
		group = data.group[group_index],
		aRet.push('<a class="item-box line-separate" '),
		aRet.push(function() {
			var a = require("tpl/common/openTarget");
			return a(group)
		} ()),
		aRet.push('>          <div class="content-main">             <i class="iconimg iconimg-m"><img width="36" height="36" src="' + group.pic + '" alt="" data-node="cImgPic"></i>             <div class="mct-a txt-xs txt-cut" data-node="cImgTxt">' + group.title_sub + "</div>          </div>      </a>");
		return aRet.push("</div>"),
		aRet.join("")
	}
}),
define("tpl/card/card2",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title S-3 Applist (card2)@category Special - 特殊类型@readme 双列式（可扩展）---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card2 line-around">    <div class="layout-box">        '), data.apps && data.apps.constructor === Array) with({
			i: 0,
			l: data.apps.length,
			app_index: 0,
			app: null
		}) for (i = l; i--;) app_index = l - i - 1,
		app = data.apps[app_index],
		aRet.push('            <a class="box-col line-separate" '),
		aRet.push(function() {
			var a = require("tpl/common/openTarget");
			return a(app)
		} ()),
		aRet.push(' data-act-type="hover">                '),
		app.count && aRet.push('                <div class="mct-a txt-s">' + app.count + "</div>                "),
		aRet.push('                <div class="mct-a txt-s txt-bottom">' + app.title + "</div>            </a>            "),
		data.apps.length > 5 && (aRet.push("                "), 3 == app_index && aRet.push('                    <a href="javascript:;" data-act-type="hover" node-type="more" class="box-col line-separate">                        <div class="mct-s txt-s"><i class="icon-font icon-font-arrow-down txt-m"></i></div>                        <div class="mct-a txt-s txt-bottom">更多</div>                    </a>                    <div node-type="pop-list" style="display:none;">                        <div class="layout-box">                '), aRet.push("                "), app_index >= 3 && (aRet.push("                    "), app_index == data.apps.length - 1 ? aRet.push("                        </div></div>                    ") : 3 != app_index && (app_index - 3) % 4 === 0 && aRet.push('                        </div><div class="layout-box" data-index="' + app_index + '">                    '), aRet.push("                ")), aRet.push("            ")),
		aRet.push("        ");
		return aRet.push("    </div></div>"),
		aRet.join("")
	}
}),
define("tpl/card/card20",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title L-3 双列式（居中不可扩展）(card20)@category Link - 链接类@readme 双列式（居中不可扩展）---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card20 line-around">'), data.group && data.group.constructor === Array) with({
			i: 0,
			l: data.group.length,
			group_index: 0,
			group: null
		}) for (i = l; i--;) group_index = l - i - 1,
		group = data.group[group_index],
		aRet.push('<a class="item-box line-separate" '),
		aRet.push(function() {
			var a = require("tpl/common/openTarget");
			return a(group)
		} ()),
		aRet.push(' data-act-type="hover">        '),
		group.pic && aRet.push('        <i class="iconimg iconimg-xs"><img width="18" height="18" src="' + group.pic + '" alt=""></i>        '),
		aRet.push('        <span class="mct-a txt-m">' + group.title_sub + "</span>    </a>");
		return aRet.push("</div>"),
		aRet.join("")
	}
}),
define("tpl/card/card21",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title U-1 单行4头像 (card21)@category User - 用户头像类@readme ---单行4头像------说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push(' <div class="card card21 line-around" data-jump="' + (data.scheme || data.openurl || "") + '" data-act-type="hover">    '), data.title && aRet.push('        <h4 class="title mct-a txt-xs">' + data.title + "</h4>    "), aRet.push('    <div class="layout-box">        <div class="box-col layout-box">            '), data.users && data.users.constructor === Array) with({
			i: 0,
			l: data.users.length,
			user_index: 0,
			user: null
		}) for (i = l; i--;) user_index = l - i - 1,
		user = data.users[user_index],
		aRet.push('            <div class="mod-media size-m">                <div class="media-main"><img data-node="cImgUsr" src="' + user.profile_image_url + '" height="64" width="64">                    '),
		aRet.push(function() {
			var a = require("tpl/common/verified");
			return a(user)
		} ()),
		aRet.push("                </div>                "),
		user.screen_name && aRet.push('                <div class="media-txt txt-s txt-cut" data-node="cNameUsr">' + user.screen_name + "</div>                "),
		aRet.push("            </div>            ");
		return aRet.push("        </div>"),
		aRet.push(function() {
			var a = require("tpl/common/arrowRight");
			return a(data)
		} ()),
		aRet.push("    </div></div>"),
		aRet.join("")
	}
}),
define("tpl/common/arrowRight",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return a && "object" == typeof a ? (a.display_arrow && 1 === a.display_arrow && b.push('<span data-node="arrow" class="plus plus-s"><i class="icon-font icon-font-arrow-right txt-s"></i></span>'), b.join("")) : ""
	}
}),
define("tpl/card/card22",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return b.push("<!--info--@title P-2 单张大图 (card22)@category Picture - 图片类@readme 单张大图（带圆角）---说明-->"),
		a && "object" == typeof a ? (b.push('<div class="card card22 line-around">   <a '), b.push(function() {
			var b = require("tpl/common/openTarget");
			return b(a)
		} ()), b.push(' data-act-type="hover">   <div class="card-inner">        <img data-node="cImgAdv" src="' + a.pic + '">        '), a.content1 && b.push('            <div class="card-title">' + a.content1 + "</div>        "), b.push("    </div>   </a></div>"), b.join("")) : ""
	}
}),
define("tpl/card/card23",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title L-5 三列式 (card23)@category Link - 链接类@readme 三列式---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card23 line-around">    <a class="layout-box" '), aRet.push(function() {
			var a = require("tpl/common/openTarget");
			return a(data)
		} ()), aRet.push(' data-act-type="hover">    '), data.apps && data.apps.constructor === Array) with({
			i: 0,
			l: data.apps.length,
			app_index: 0,
			app: null
		}) for (i = l; i--;) app_index = l - i - 1,
		app = data.apps[app_index],
		aRet.push('        <div class="box-col line-separate">        '),
		app.count && aRet.push('            <div class="mct-a txt-m">' + app.count + "</div>"),
		aRet.push('            <div class="mct-c txt-xs">' + app.title + "</div>        </div>");
		return aRet.push(function() {
			var a = require("tpl/common/arrowRight");
			return a(data)
		} ()),
		aRet.push("    </a></div>"),
		aRet.join("")
	}
}),
define("tpl/card/card24",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title U-2 单行7头像 (card24)@category User - 用户头像类@readme 单行7头像---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card24 line-around">    '), data.title && aRet.push('        <h4 class="title mct-a txt-xs">' + data.title + "</h4>    "), aRet.push("    <a "), aRet.push(function() {
			var a = require("tpl/common/openTarget");
			return a(data)
		} ()), aRet.push(' data-act-type="hover" class="layout-box">        <div class="box-col layout-box">        '), data.users && data.users.constructor === Array) with({
			i: 0,
			l: data.users.length,
			user_index: 0,
			user: null
		}) for (i = l; i--;) user_index = l - i - 1,
		user = data.users[user_index],
		aRet.push('            <div class="mod-media size-xs">                <div class="media-main"><img src="' + user.profile_image_url + '" height="34" width="34" />'),
		aRet.push(function() {
			var a = require("tpl/common/verified");
			return a(user)
		} ()),
		aRet.push("</div>            </div>            ");
		return aRet.push("        </div>"),
		aRet.push(function() {
			var a = require("tpl/common/arrowRight");
			return a(data)
		} ()),
		aRet.push("    </a></div>"),
		aRet.join("")
	}
}),
define("tpl/card/card25",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title PT-5 图像文字混排两行两字段 (card25)@category Picture + Text - 图片文字混排类@readme 图像文字混排两行两字段---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card25 line-around" data-node="card" data-jump="' + (data.scheme ? data.scheme: data.openurl ? data.openurl: "") + '" data-act-type="hover">    <div class="layout-box media-graphic">        '), (data.score || data.pic) && (aRet.push('            <div class="mod-media size-s">                <div class="media-main">                    '), data.score ? aRet.push('                        <span class="score-box">' + data.score + "</span>                    ") : data.pic && aRet.push('                        <img src="' + data.pic + '" height="50" width="50" data-node="cImg">                    '), aRet.push("                </div>            </div>        ")), aRet.push('        <div class="box-col item-list">            '), data.title_sub && aRet.push('            <div class="item-main txt-m mct-a txt-cut" data-node="cTitle">' + data.title_sub + "</div>            "), aRet.push("            "), data.desc && aRet.push('            <div class="item-minor txt-s mct-d txt-cut">' + data.desc + "</div>            "), aRet.push("        </div>"), aRet.push(function() {
			var a = require("tpl/common/arrowRight");
			return a(data)
		} ()), aRet.push("        "), data.buttons) {
			if (aRet.push("        "), data.buttons && data.buttons.constructor === Array) with({
				i: 0,
				l: data.buttons.length,
				btn_index: 0,
				btn: null
			}) for (i = l; i--;) btn_index = l - i - 1,
			btn = data.buttons[btn_index],
			aRet.push("             "),
			aRet.push(function() {
				var a = require("tpl/common/button");
				return a(btn)
			} ()),
			aRet.push("         ");
			aRet.push("         ")
		}
		return aRet.push("    </div></div>"),
		aRet.join("")
	}
}),
define("tpl/card/card26",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title PT-1 图像文字混排三行两字段 (card26)@category Picture + Text - 图片文字混排类@readme 图像文字混排三行两字段---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push(' <div class="card card26 line-around" data-node="card" data-jump="' + (data.scheme ? data.scheme: data.openurl ? data.openurl: "") + '" '), data.actionlog && data.actionlog.act_code && aRet.push('data-actcode="' + data.actionlog.act_code + '" '), aRet.push('data-act-type="hover">    <div class="layout-box media-graphic">        '), data.pic && aRet.push('        <div class="mod-media size-m">            <div class="media-main"><img data-node="cImg" src="' + data.pic + '" height="64" width="64"></div>         </div>         '), aRet.push("         "), data.title_sub && data.desc && (aRet.push('               <div class="box-col item-list">            '), data.title_sub && aRet.push('            <div class="item-main txt-cut-2 txt-m mct-a" data-node="cTitle">' + data.title_sub + "</div>            "), aRet.push("            "), data.desc && aRet.push('            <div class="item-minor txt-cut txt-s mct-d" data-node="cDesc">' + data.desc + "</div>            "), aRet.push("        </div>        ")), aRet.push(function() {
			var a = require("tpl/common/arrowRight");
			return a(data)
		} ()), aRet.push("        "), data.buttons) {
			if (aRet.push("        "), data.buttons && data.buttons.constructor === Array) with({
				i: 0,
				l: data.buttons.length,
				btn_index: 0,
				btn: null
			}) for (i = l; i--;) btn_index = l - i - 1,
			btn = data.buttons[btn_index],
			aRet.push("            "),
			aRet.push(function() {
				var a = require("tpl/common/button");
				return a(btn)
			} ()),
			aRet.push("         ");
			aRet.push("         ")
		}
		return aRet.push("    </div></div>"),
		aRet.join("")
	}
}),
define("tpl/card/card27",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title PT-6 大图推广 (card27)@category Picture + Text - 图片文字混排类@readme 大图推广 ---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card27 line-around" data-node="card" data-jump="' + (data.scheme ? data.scheme: data.openurl ? data.openurl: "") + '" data-act-type="hover">    '), (data.title_sub || data.pic || data.desc) && (aRet.push('    <div class="main-content">        '), data.title_sub && aRet.push('        <h4 class="title mct-b txt-l" data-node="cTitle">' + data.title_sub + "</h4>        "), aRet.push("        "), data.pic && aRet.push('        <div class="media-pic">            <img src="' + data.pic + '" data-node="cImg" alt="">        </div>         '), aRet.push("         "), data.desc && aRet.push('        <div class="media-txt txt-xs" data-node="cDesc">            ' + data.desc + "        </div>        "), aRet.push("    </div>    ")), aRet.push("    "), data.buttons && data.buttons.length) {
			if (aRet.push('    <footer class="more-detail line-top '), data.buttons.length > 1 && aRet.push("layout-box"), aRet.push('">        '), data.buttons.length > 1) {
				if (aRet.push("            "), data.buttons && data.buttons.constructor === Array) with({
					i: 0,
					l: data.buttons.length,
					btn_index: 0,
					btn: null
				}) for (i = l; i--;) btn_index = l - i - 1,
				btn = data.buttons[btn_index],
				aRet.push('            <a data-active="1" href="' + (btn.params && btn.params.scheme ? btn.params.scheme: btn.params && btn.params.openurl ? btn.params.openurl: "javascript:void(0);") + '" class="box-col '),
				btn_index + 1 !== data.buttons.length && aRet.push("line-right"),
				aRet.push(' txt-s" data-node="cImgTxtLink" '),
				btn.type && aRet.push('data-type="' + btn.type + '"'),
				aRet.push(">                "),
				btn.type && "like" === btn.type ? (aRet.push("                    "), aRet.push(btn.sub_type && 1 === btn.sub_type ? '                    <i class="icon-font icon-font-liked"></i>                    ': '                    <i class="icon-font icon-font-like"></i>                    '), aRet.push("                ")) : btn.type && "forward" === btn.type ? (aRet.push("                    "), aRet.push(btn.sub_type && 1 === btn.sub_type ? '                    <i class="icon-font icon-font-forwarded"></i>                    ': '                    <i class="icon-font icon-font-forward"></i>                    '), aRet.push("                ")) : btn.type && "dots" === btn.type ? (aRet.push("                    "), aRet.push(btn.sub_type && 1 === btn.sub_type ? '                    <i class="icon-font icon-font-dotsed"></i>                    ': '                    <i class="icon-font icon-font-dots"></i>                    '), aRet.push("                ")) : aRet.push('                    <i class="iconimg iconimg-xs">                        <img data-node="cImgPic" src="' + btn.pic + '" alt="" />                    </i>                '),
				aRet.push("                "),
				btn.name && aRet.push('                <em class="num mct-d">' + btn.name + "</em>                "),
				aRet.push("            </a>            ");
				aRet.push("        ")
			} else {
				if (aRet.push("            "), data.buttons && data.buttons.constructor === Array) with({
					i: 0,
					l: data.buttons.length,
					btn_index: 0,
					btn: null
				}) for (i = l; i--;) btn_index = l - i - 1,
				btn = data.buttons[btn_index],
				aRet.push('            <a data-active="1" data-node="cImgTxtLink" href="' + (btn.params && btn.params.scheme ? btn.params.scheme: btn.params && btn.params.openurl ? btn.params.openurl: "javascript:void(0);") + '" class="mct-d txt-m">' + btn.name + "            "),
				data.display_arrow && 1 === data.display_arrow && aRet.push('            <i class="icon-font icon-font-arrow-down"></i>            '),
				aRet.push("            </a>            ");
				aRet.push("        ")
			}
			aRet.push("    </footer>    ")
		}
		return aRet.push("</div>"),
		aRet.join("")
	}
}),
define("tpl/card/card28",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title UT-2 头像文字混排三行两字段 (card28)@category User + Text - 头像文字混排类@readme 头像文字混排三行两字段---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card28 line-around">    <div class="layout-box media-graphic">         <div class="mod-media size-m">            <div class="media-main"><img src="' + data.user.profile_image_url + '" height="64" width="64"></div>         </div>                   <div class="box-col item-list">            <div class="item-main txt-m mct-a txt-cut">' + data.user.screen_name + '<a href="" class="btn btn-vip">'), aRet.push(function() {
			var a = require("tpl/common/verified");
			return a(data.user)
		} ()), aRet.push('<i class="icon-font icon-font-arrow-right"></i></a></div>            <div class="item-minor txt-s mct-d">简介：' + data.user.description + "</div>        </div>"), aRet.push(function() {
			var a = require("tpl/common/arrowRight");
			return a(data)
		} ()), data.buttons && data.buttons && data.buttons.constructor === Array) with({
			i: 0,
			l: data.buttons.length,
			btn_index: 0,
			btn: null
		}) for (i = l; i--;) btn_index = l - i - 1,
		btn = data.buttons[btn_index],
		aRet.push("        "),
		aRet.push(function() {
			var a = require("tpl/common/button");
			return a(btn)
		} ()),
		aRet.push("        ");
		return aRet.push("    </div></div>"),
		aRet.join("")
	}
}),
define("tpl/card/card29",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return b.push("<!--info--@title P-3 单张大图 (card29)@category Picture - 图片类@readme 单张大图（带边距）---说明-->"),
		a && "object" == typeof a ? (b.push('<div class="card card29 line-around" data-node="card"><a '), b.push(function() {
			var b = require("tpl/common/openTarget");
			return b(a)
		} ()), b.push(' data-act-type="hover">'), a.title_sub && b.push('    <h4 class="title txt-s" data-node="cTitle">' + a.title_sub + "</h4>    "), b.push('    <div class="media-pic">         <img data-node="cImgPic" src="' + a.pic + '" style="width:100%;height:82px;" alt="">    </div>    </a></div>'), b.join("")) : ""
	}
}),
define("tpl/card/card3",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title P-1 单行4张（单触区）(card3)@category Picture - 图片类@readme 单行4张（单触区）---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card3 line-around">    '), data.title && aRet.push('        <h4 class="title mct-a txt-xs">' + data.title + "</h4>    "), aRet.push("    <a "), aRet.push(function() {
			var a = require("tpl/common/openTarget");
			return a(data)
		} ()), aRet.push(' data-act-type="hover" class="layout-box">        <div class="box-col layout-box">            '), data.pics && data.pics.constructor === Array) with({
			i: 0,
			l: data.pics.length,
			item_index: 0,
			item: null
		}) for (i = l; i--;) item_index = l - i - 1,
		item = data.pics[item_index],
		aRet.push("                "),
		4 > item_index && (aRet.push('                    <div class="mod-media size-m">                        <div class="media-main">                            <img src="' + item.pic + '" height="64" width="64">                        </div>                        '), item.desc1 && aRet.push('                            <div class="media-txt txt-s mct-a txt-cut">' + item.desc1 + "</div>                        "), aRet.push("                    </div>                ")),
		aRet.push("            ");
		return aRet.push("        </div>"),
		aRet.push(function() {
			var a = require("tpl/common/arrowRight");
			return a(data)
		} ()),
		aRet.push("    </a></div>"),
		aRet.join("")
	}
}),
define("tpl/card/card30",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title UT-3 头像文字混排两行两字段 (card30)@category User + Text - 头像文字混排类@readme 头像文字混排两行两字段---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card30 line-around" data-node="card" data-jump="' + (data.scheme || data.openurl || "") + '" data-act-type="hover">    <div class="layout-box media-graphic">         <div class="mod-media size-m">            <div class="media-main">                <img src="' + data.user.profile_image_url + '" data-node="cImgUsr" height="64" width="64"/>                    '), aRet.push(function() {
			var a = require("tpl/common/verified");
			return a(data.user)
		} ()), aRet.push('            </div>        </div>          <div class="box-col item-list">            <div class="item-main txt-m mct-a txt-cut" data-node="cNameUsr">' + data.user.screen_name + "                "), !data.user.mbtype || 11 !== data.user.mbtype && 12 !== data.user.mbtype && 13 !== data.user.mbtype && 14 !== data.user.mbtype ? (aRet.push('                <a data-node="cIconLink" '), aRet.push(function() {
			var a = require("tpl/common/openTarget");
			return a(data.user)
		} ()), aRet.push(' data-act-type="hover" class="btn btn-nvip"><i class="icon icon-nvip"></i>                ')) : (aRet.push('                <a data-node="cIconLink" '), aRet.push(function() {
			var a = require("tpl/common/openTarget");
			return a(data.user)
		} ()), aRet.push(' data-act-type="hover" class="btn btn-vip"><i class="icon icon-vip"></i>                ')), aRet.push('                <i class="icon-font icon-font-arrow-right"></i>                </a>            </div>            '), data.desc1 && aRet.push('            <div class="item-minor txt-s mct-d" data-node="cTxtUsr">' + data.desc1 + "</div>            "), aRet.push("        </div>"), aRet.push(function() {
			var a = require("tpl/common/arrowRight");
			return a(data)
		} ()), aRet.push("        "), data.buttons) {
			if (aRet.push("        "), data.buttons && data.buttons.constructor === Array) with({
				i: 0,
				l: data.buttons.length,
				btn_index: 0,
				btn: null
			}) for (i = l; i--;) btn_index = l - i - 1,
			btn = data.buttons[btn_index],
			aRet.push("            "),
			aRet.push(function() {
				var a = require("tpl/common/button");
				return a(btn)
			} ()),
			aRet.push("         ");
			aRet.push("         ")
		}
		return aRet.push("    </div></div>"),
		aRet.join("")
	}
}),
define("tpl/card/card31",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return b.push("<!--info--@title S-4 搜索框 (card31)@category Special - 特殊类型@readme 搜索框---说明-->"),
		a && "object" == typeof a ? (b.push('<div class="card card31 line-around">    <form method="" class="search-box layout-box" node-type="search-box"><div class="input-wrapper box-col"><span class="fl type iconf iconf_navbar_search" node-type="icon-search"></span><div class="input-box"><input name="q" class="search" type="text" node-type="search" placeholder="' + (a.desc || a.desc1 || "") + '"></div></div><span node-type="btn" class="btn-txt">取消</span>    </form></div>'), b.join("")) : ""
	}
}),
define("tpl/card/card32",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return b.push("<!--info--@title S-5 新粉丝提醒 (card32)@category Special - 特殊类型@readme 新粉丝提醒---说明-->"),
		a && "object" == typeof a ? (b.push('<div class="card card32 line-around" data-node="card" data-act-type="hover" data-jump="' + (a.scheme || a.openurl || "") + '">    <a '), b.push(function() {
			var b = require("tpl/common/openTarget");
			return b(a)
		} ()), b.push(' class="layout-box" data-act-type="hover">        '), a.pic && b.push('        <i class="iconimg iconimg-s">            <img width="23" height="23" src="' + a.pic + '" data-node="cMesImg">        </i>        '), b.push('        <div class="box-col txt-cut"><span class="mct-a " data-node="cMesTxt">' + a.desc1 + '</span></div>        <span class="plus plus-m">            '), a.desc2 && b.push('            <i class="bubble bubble-dot-red txt-xs" data-node="cMesNum">' + a.desc2 + "</i>            "), b.push("            "), b.push(function() {
			var b = require("tpl/common/arrowRight");
			return b(a)
		} ()), b.push("        </span>              </a></div>"), b.join("")) : ""
	}
}),
define("tpl/card/card33",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (!data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card33 line-around">    <div class="layout-box">        <div class="box-col layout-box">            '), data.pics && data.pics.constructor === Array) with({
			i: 0,
			l: data.pics.length,
			item_index: 0,
			item: null
		}) for (i = l; i--;) item_index = l - i - 1,
		item = data.pics[item_index],
		aRet.push('            <div class="mod-media size-m">                <div class="media-main">                    <img src="' + item.pic + '" height="64" width="64">                </div>            </div>');
		return aRet.push("        </div>"),
		aRet.push(function() {
			var a = require("tpl/common/arrowRight");
			return a(data)
		} ()),
		aRet.push("    </div></div>"),
		aRet.join("")
	}
}),
define("tpl/card/card35",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title P-4 单行3张（多触区，支持扩展） (card35)@category Picture - 图片类@readme 单行3张（多触区，支持扩展）---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card35 line-around">'), data.pics && data.pics.constructor === Array) with({
			i: 0,
			l: data.pics.length,
			pic_index: 0,
			pic: null
		}) for (i = l; i--;) pic_index = l - i - 1,
		pic = data.pics[pic_index],
		aRet.push('    <a class="item-box mod-media" '),
		aRet.push(function() {
			var a = require("tpl/common/openTarget");
			return a(pic)
		} ()),
		aRet.push(' data-act-type="hover">        <div class="media-main">            <img src="' + pic.pic_small + '" />        </div>'),
		pic.desc1 && aRet.push('        <div class="media-txt mct-a txt-s txt-cut">           ' + pic.desc1 + "        </div>"),
		aRet.push("    </a>");
		return aRet.push("</div>"),
		aRet.join("")
	}
}),
define("tpl/card/card36",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (!data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card36 line-around">    <div class="layout-box media-graphic">         <div class="mod-media size-l">            <div class="media-main"><img src="' + data.pic + '" height="70" width="70"><!--<i class="icon icon-vgirl"></i>--></div>         </div>                   <div class="box-col item-list">            <div class="item-main txt-m mct-a">' + data.title_sub + '</div>            <div class="item-minor"><em class="original mct-num txt-s">' + data.desc1 + '</em><em class="resent-price mct-d txt-xs">' + data.desc2 + '</em><em class="other-info mct-d txt-xs">' + data.desc3 + "</em></div>        </div>        "), data.buttons) {
			if (aRet.push("            "), data.buttons && data.buttons.constructor === Array) with({
				i: 0,
				l: data.buttons.length,
				btn_index: 0,
				btn: null
			}) for (i = l; i--;) btn_index = l - i - 1,
			btn = data.buttons[btn_index],
			aRet.push("                "),
			aRet.push(function() {
				var a = require("tpl/common/button");
				return a(btn)
			} ()),
			aRet.push("            ");
			aRet.push("        ")
		}
		return aRet.push('        <!--        <div class="mod-operate">            <div class="operate-inner">                <div class="inner">                    <span class="icon-font icon-font-cart"></span>                    <div class="txt-xxs">购买</div>                </div>            </div>        </div>        -->    </div></div>'),
		aRet.join("")
	}
}),
define("tpl/card/card38",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (!data || "object" != typeof data) return "";
		if (aRet.push('<div class="card line-around card38">    <div class="star-box">        '), [1, 2, 3, 4, 5].constructor === Array) with({
			i: 0,
			l: [1, 2, 3, 4, 5].length,
			r_index: 0,
			r: null
		}) for (i = l; i--;) r_index = l - i - 1,
		r = [1, 2, 3, 4, 5][r_index],
		aRet.push('        <span class="icon-font icon-font-star'),
		data.rating >= r && aRet.push(" star-choosed"),
		aRet.push('"></span>        ');
		return aRet.push('    </div>    <div class="star-info mct-d txt-s">' + ["", "很差", "一般", "还行", "不错", "怒赞"][data.rating] + '</div>    <div class="more-detail line-top"><a href="' + data.buttonscheme + '" class="mct-d txt-m">' + data.buttontitle + "</a></div></div>"),
		aRet.join("")
	}
}),
define("tpl/card/card39",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return b.push("<!--info--@title P-4 单行3张（多触区，支持扩展） (card39)@category Picture - 图片类@readme 单行3张（多触区，支持扩展）---说明-->"),
		a && "object" == typeof a ? (b.push('<div class="card card39 line-around" data-act-type="hover"><a href="' + a.video_infos.media_info.h5_url + '">        <i class="icon icon-video"></i>        <img src="' + a.video_infos.pic_url + '" alt="">    </a></div>'), b.join("")) : ""
	}
}),
define("tpl/card/card4",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return b.push("<!--info--@title L-1 单列式 (card4)@category Link - 链接类@readme 单列式---说明-->"),
		a && "object" == typeof a ? (b.push('<!--带图标--><div class="card card4 line-around">    <a '), b.push(function() {
			var b = require("tpl/common/openTarget");
			return b(a)
		} ()), b.push(' class="layout-box" data-act-type="hover">    '), a.pic && b.push('    <i class="iconimg iconimg-s"><img width="23" height="23" src="' + a.pic + '" alt=""></i>    '), b.push('    <div class="box-col txt-cut">        <span class="mct-a ">' + a.desc + "</span>        "), a.desc_extr && b.push('        <span class="mct-b txt-xs">' + a.desc_extr + "</span>        "), b.push("    </div>    "), b.push(function() {
			var b = require("tpl/common/arrowRight");
			return b(a)
		} ()), b.push("    </a></div>"), b.join("")) : ""
	}
}),
define("tpl/card/card40",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return a && "object" == typeof a ? (b.push('<div class="card line-around card40">    <div class="layout-box media-graphic">        '), a.pic_url && b.push('            <div class="mod-media size-s" data-jump="' + a.pic_scheme + '" data-act-type="hover">                <div class="media-main"><img src="' + a.pic_url + '" height="50" width="50"></div>            </div>        '), b.push('        <div class="box-col item-list">            <div class="item-main layout-box txt-s mct-a">                <div class="main box-col txt-cut">' + a.title_sub + '</div>                <div class="plus">' + a.desc3 + '</div>            </div>            <div class="item-minor layout-box txt-xs mct-d">                <div class="main box-col txt-cut">' + a.desc1 + '</div>                <div class="plus color-'), b.push(0 == a.desc2_color ? "0": 1 == a.desc2_color ? "1": "2"), b.push('">' + a.desc2 + "</div>            </div>        </div>    </div></div>"), b.join("")) : ""
	}
}),
define("tpl/card/card41",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return a && "object" == typeof a ? (b.push('<div class="card card41 line-around">    <div class="layout-box">        '), a.item_name && b.push('        <div class="des-title txt-m mct-d">' + a.item_name + "</div>        "), b.push('        <div class="box-col des-main txt-m">' + a.item_content + "</div>    </div> </div>"), b.join("")) : ""
	}
}),
define("tpl/card/card42",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return a && "object" == typeof a ? (b.push('<div class="card card42 line-around" data-act-type="hover">    <a '), b.push(function() {
			var b = require("tpl/common/openTarget");
			return b(a)
		} ()), b.push(' class="layout-box" data-act-type="hover">        '), a.pic && b.push('            <i class="iconimg iconimg-s"><img width="23" height="23" src="' + a.pic + '" alt=""></i>        '), b.push('        <div class="box-col txt-cut">            <span class="mct-a ">' + a.desc + "</span>            "), a.desc_extr && b.push('            <span class="mct-b txt-xs">' + a.desc_extr + "</span>            "), b.push("        </div>        "), b.push(function() {
			var b = require("tpl/common/arrowRight");
			return b(a)
		} ()), b.push("    </a></div>"), b.join("")) : ""
	}
}),
define("tpl/card/card6",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return b.push("<!--info--@title L-7 按钮式 (card6)@category Link - 链接类@readme 按钮式（跳转）---说明-->"),
		a && "object" == typeof a ? (b.push('<div class="card card6">    <a '), b.push(function() {
			var b = require("tpl/common/openTarget");
			return b(a)
		} ()), b.push(' data-act-type="hover" class=" btn-'), 0 != a.show_type && "show_type" in a ? 1 == a.show_type ? b.push("orange") : 2 == a.show_type ? b.push("red") : 3 == a.show_type ? b.push("blue") : 4 == a.show_type && b.push("white") : b.push("default"), b.push('">        ' + a.desc + "        "), a.show_type && 0 === a.show_type && b.push('        <i class="icon-font icon-font-arrow-right"></i>        '), b.push("    </a></div>"), b.join("")) : ""
	}
}),
define("tpl/card/card7",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return b.push("<!--info--@title T-1 四行以内纯文本 (card7)@category Text - 纯文本类@readme 四行以内纯文本（两个字段）---说明-->"),
		a && "object" == typeof a ? (b.push('<div class="card card7 line-around" data-node="card">    '), a.title && b.push('    <h4 class="title mct-d txt-xs" data-node="cTitle">' + a.title + "</h4>    "), b.push("    <a "), b.push(function() {
			var b = require("tpl/common/openTarget");
			return b(a)
		} ()), b.push(' data-act-type="hover" class="layout-box">        <div class="box-col content-text txt-l mct-a" data-node="cDesc">            ' + a.desc + "        </div>"), b.push(function() {
			var b = require("tpl/common/arrowRight");
			return b(a)
		} ()), b.push("    </a>     "), a.source && b.push('    <div class="info-footer mct-d txt-xxs" data-node="cSource">' + a.source + "</div>    "), b.push("</div>"), b.join("")) : ""
	}
}),
define("tpl/card/card8",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title PT-2 图像文字混排三行三字段 (card8)@category Picture + Text - 图片文字混排类@readme 图像文字混排三行三字段---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card8 line-around" data-node="card" data-jump="' + (data.scheme ? data.scheme: data.openurl ? data.openurl: "") + '" '), data.actionlog && data.actionlog.act_code && aRet.push('data-actcode="' + data.actionlog.act_code + '" '), aRet.push('data-act-type="hover">    '), data.title && aRet.push('        <h4 class="title mct-a txt-xs">' + data.title + "</h4>    "), aRet.push('    <div class="layout-box media-graphic">        '), data.pic && aRet.push('        <div class="mod-media size-m">            <div class="media-main"><img data-node="cImg" src="' + data.pic + '" height="64" width="64"></div>         </div>        '), aRet.push('             <div class="box-col item-list">            '), data.title_sub && aRet.push('            <div class="item-main txt-m mct-a txt-cut" data-node="cTitle">' + data.title_sub + "</div>            "), aRet.push("            "), data.desc1 && aRet.push('            <div class="item-minor txt-s mct-d txt-cut" data-node="cDesc">' + data.desc1 + "</div>            "), aRet.push("            "), data.desc2 && aRet.push('            <div class="item-other txt-s mct-d txt-cut" data-node="cDesc">' + data.desc2 + "</div>            "), aRet.push("        </div>"), aRet.push(function() {
			var a = require("tpl/common/arrowRight");
			return a(data)
		} ()), aRet.push("        "), data.buttons) {
			if (aRet.push("        "), data.buttons && data.buttons.constructor === Array) with({
				i: 0,
				l: data.buttons.length,
				btn_index: 0,
				btn: null
			}) for (i = l; i--;) btn_index = l - i - 1,
			btn = data.buttons[btn_index],
			aRet.push("            "),
			aRet.push(function() {
				var a = require("tpl/common/button");
				return a(btn)
			} ()),
			aRet.push("        ");
			aRet.push("        ")
		}
		return aRet.push("    </div></div>"),
		aRet.join("")
	}
}),
define("tpl/card/card9",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title UT-1 头像文字混排三行三字段 (card10)@category User + Text - 头像文字混排类@readme 头像文字混排三行三字段,支持Card标题,支持趋势投放---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card9 line-around"'), 1 != data.single && (aRet.push(' data-act-type="hover"'), 1 != data.mblog.deleted && aRet.push(' data-jump="/' + data.mblog.user.id + "/" + data.mblog.bid + '"')), aRet.push(">    "), 1 == data.mblog.deleted) aRet.push('        <section class="weibo-detail" style="padding:10px">            <p class="default-content">' + data.mblog.text + "</p>        </section>    ");
		else {
			if (aRet.push("        "), !data.hideoperate && (data.mblog.isTop || data.mblog.visible && data.mblog.visible.type) && (aRet.push('        <div class="line-around head-bar" data-act-type="hover">            <h3 class="title mct-d txt-xs">'), data.mblog.isTop ? aRet.push("置顶") : (aRet.push("              "), 1 == data.mblog.visible.type ? aRet.push("自己可见") : 3 == data.mblog.visible.type ? aRet.push("分组可见") : 6 == data.mblog.visible.type && aRet.push("好友圈"), aRet.push("            ")), aRet.push('</h3>            <i class="icon-font icon-font-arrow-down txt-s"></i>        </div>        ')), aRet.push("        "), data.mblog.afr && "ad" === data.mblog.afr && aRet.push('            <div class="line-around head-bar">                <h3 class="title mct-d txt-xs">推广</h3>                <i class="icon-font icon-font-arrow-down txt-s"></i>            </div>        '), aRet.push('        <header class="layout-box media-graphic">            <a href="' + data.mblog.user.profile_url + '" class="mod-media size-xs">                <div class="media-main"><img src="' + data.mblog.user.profile_image_url + '" width="100%">'), aRet.push(function() {
				var a = require("tpl/common/verified");
				return a(data.mblog.user)
			} ()), aRet.push(' </div>            </a>            <div class="box-col item-list">                <a href="' + data.mblog.user.profile_url + '" class="item-main txt-l mct-a txt-cut">                    <span>' + data.mblog.user.screen_name + "</span>                    "), data.mblog.user.remark && aRet.push('<span class="mct-d txt-s">(' + data.mblog.user.remark + ")</span>"), aRet.push("                    "), data.mblog.user.ismember && aRet.push('<i class="icon icon-vip"></i>'), aRet.push('                </a>                <div class="item-minor txt-xxs mct-d txt-cut"><span class="time">' + data.mblog.created_at + "</span>"), data.mblog.source && aRet.push('<span class="from">来自' + data.mblog.source + "</span>"), aRet.push("</div>            </div>            "), data.hideoperate || data.hidebtns || data.mblog.isTop || data.mblog.visible && data.mblog.visible.type || aRet.push('            <a class="operate-box" data-act-type="hover">                <i class="icon-font icon-font-arrow-down txt-s"></i>            </a>            '), aRet.push('        </header>        <section class="weibo-detail">            '), data.mblog.report_info && aRet.push('                <a href="' + (data.mblog.report_info.url || "javascript:;") + '" class="repoet-info">' + data.mblog.report_info.text + "</a>            "), aRet.push('            <p class="default-content txt-xl">' + data.mblog.text + "</p>            "), aRet.push(function() {
				var a = require("tpl/common/feedPic");
				return a(data.mblog)
			} ()), aRet.push("            "), data.mblog.retweeted_status && (aRet.push('            <div class="extend-content" data-act-type="hover"'), 1 != data.mblog.retweeted_status.deleted && aRet.push(' data-jump="/' + data.mblog.retweeted_status.user.id + "/" + data.mblog.retweeted_status.bid + '"'), aRet.push('>                <div class="inner">                    '), data.mblog.retweeted_status.report_info && aRet.push('                        <a href="' + (data.mblog.retweeted_status.report_info.url || "javascript:;") + '" class="repoet-info">' + data.mblog.retweeted_status.report_info.text + "</a>                    "), aRet.push('                    <p class="weibo-original txt-l">'), data.mblog.retweeted_status.user && data.mblog.retweeted_status.user.id && aRet.push('<a href="' + data.mblog.retweeted_status.user.profile_url + '" class="">@' + data.mblog.retweeted_status.user.screen_name + "</a>："), aRet.push("" + data.mblog.retweeted_status.text + "</p>                    "), aRet.push(function() {
				var a = require("tpl/common/feedPic");
				return a(data.mblog.retweeted_status)
			} ()), aRet.push("                    "), data.mblog.retweeted_status.pic_ids && data.mblog.retweeted_status.pic_ids.length || !data.mblog.retweeted_status.page_info || (aRet.push("                        "), aRet.push(function() {
				var a = require("tpl/card/smallPage");
				return a(data.mblog.retweeted_status.page_info)
			} ()), aRet.push("                    ")), aRet.push("                </div>            </div>            ")), aRet.push("            "), data.mblog.pic_ids && data.mblog.pic_ids.length || !data.mblog.page_info || (aRet.push("                "), aRet.push(function() {
				var a = require("tpl/card/smallPage");
				return a(data.mblog.page_info)
			} ()), aRet.push("            ")), aRet.push("            "), data.mblog.mblog_comments && data.mblog.mblog_comments.length) {
				if (aRet.push('            <div class="comment-show txt-s line-all">                '), data.mblog.mblog_comments && data.mblog.mblog_comments.constructor === Array) with({
					i: 0,
					l: data.mblog.mblog_comments.length,
					cmt_index: 0,
					cmt: null
				}) for (i = l; i--;) cmt_index = l - i - 1,
				cmt = data.mblog.mblog_comments[cmt_index],
				aRet.push('                <div class="a-comment"><a href="/u/' + cmt.user.id + '">' + cmt.user.name + "</a>"),
				cmt.reply || aRet.push("："),
				aRet.push("" + cmt.text + "</div>                ");
				aRet.push("            </div>            ")
			}
			aRet.push("        </section>        "),
			data.hidebtns || (aRet.push('        <footer class="more-detail line-top layout-box box-center-v">            '), 0 == data.mblog.visible.type && (aRet.push('            <a href="javascript:void(0);" class="box-col txt-s" data-act-type="hover" data-node="forward"><i class="icon-font icon-font-forward"></i><em class="num mct-d">'), aRet.push(data.mblog.reposts_count && 1 != data.single ? "" + data.mblog.reposts_count: "转发"), aRet.push('</em></a>            <i class="line-gradient"></i>            ')), aRet.push('            <a href="javascript:void(0);" class="box-col txt-s" data-act-type="hover" data-node="comment"><i class="icon-font icon-font-comment"></i><em class="num mct-d">'), aRet.push(data.mblog.comments_count && 1 != data.single ? "" + data.mblog.comments_count: "评论"), aRet.push('</em></a>            <i class="line-gradient"></i>            <a href="javascript:void(0);" class="box-col txt-s" data-act-type="hover" data-node="like"><i class="icon icon-like'), 1 == data.mblog.attitudes_status && aRet.push("d"), aRet.push('small"></i><em class="num mct-d">'), aRet.push(data.mblog.attitudes_count && 1 != data.single ? "" + data.mblog.attitudes_count: "赞"), aRet.push("</em></a>        </footer>        ")),
			aRet.push("    ")
		}
		return aRet.push("</div>"),
		aRet.join("")
	}
}),
define("tpl/common/feedPic",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(mblog) {
		var aRet = [];
		if (!mblog || "object" != typeof mblog) return "";
		if (mblog.pic_ids && mblog.pic_ids.length) if (aRet.push("    "), 1 === mblog.pic_ids.length) aRet.push('        <div class="media-pic">            <img '),
		aRet.push(mblog.pics[0].geo && mblog.pics[0].geo.width ? 'data-src="' + mblog.pics[0].url + '" width="' + mblog.pics[0].geo.width + '" height="' + mblog.pics[0].geo.height + '"': 'src="' + mblog.pics[0].url + '"'),
		aRet.push(' data-node="pic" data-act-type="hover">        </div>    ');
		else {
			if (aRet.push('    <div class="media-pic-list'), 4 === mblog.pic_ids.length && aRet.push(" type-scube"), aRet.push('">        <ul>            '), mblog.pics && mblog.pics.constructor === Array) with({
				i: 0,
				l: mblog.pics.length,
				pic_index: 0,
				pic: null
			}) for (i = l; i--;) pic_index = l - i - 1,
			pic = mblog.pics[pic_index],
			aRet.push('                <li><img data-src="' + pic.url + '" data-node="pic" data-act-type="hover"></li>            ');
			aRet.push("        </ul>    </div>  ")
		}
		return aRet.join("")
	}
}),
define("tpl/card/smallPage",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return a && "object" == typeof a ? (b.push("    "), 10 == a.type ? (b.push("        "), b.push(function() {
			var b = require("tpl/card/sp10");
			return b(a)
		} ()), b.push("    ")) : 2 == a.type || 12 == a.type ? (b.push("        "), b.push(function() {
			var b = require("tpl/card/sp2");
			return b(a)
		} ()), b.push("    ")) : 5 == a.type ? (b.push("        "), b.push(function() {
			var b = require("tpl/card/sp5");
			return b(a)
		} ()), b.push("    ")) : 13 == a.type ? (b.push("        "), b.push(function() {
			var b = require("tpl/card/sp13");
			return b(a)
		} ()), b.push("    ")) : (b.push("        "), b.push(function() {
			var b = require("tpl/card/sp0");
			return b(a)
		} ()), b.push("    ")), b.join("")) : ""
	}
}),
define("tpl/card/sp10",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (!data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card36" data-node="card" data-jump="' + data.page_url + '">    <div class="layout-box media-graphic">         <div class="mod-media size-l">            <div class="media-main"><img src="' + data.page_pic + '" height="70" width="70"></div>         </div>                   <div class="box-col item-list">            <div class="item-main txt-cut-2 txt-m mct-a">' + data.content1 + '</div>            <div class="item-minor">                <em class="original mct-num txt-s">' + data.content2 + '</em>                <em class="resent-price mct-d txt-xs">' + data.content3 + '</em>                <!-- <em class="other-info mct-d txt-xs">' + data.content3 + "</em></div> -->            </div>        </div>        "), data.buttons) {
			if (aRet.push("            "), data.buttons && data.buttons.constructor === Array) with({
				i: 0,
				l: data.buttons.length,
				btn_index: 0,
				btn: null
			}) for (i = l; i--;) btn_index = l - i - 1,
			btn = data.buttons[btn_index],
			aRet.push("                "),
			aRet.push(function() {
				var a = require("tpl/common/button");
				return a(btn)
			} ()),
			aRet.push("            ");
			aRet.push("        ")
		}
		return aRet.push("    </div></div>"),
		aRet.join("")
	}
}),
define("tpl/card/sp2",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (!data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card8" data-node="card" data-jump="' + data.page_url + '" data-act-type="hover">    <div class="layout-box media-graphic">        '), data.page_pic ? (aRet.push('            <div class="mod-media size-m" '), data.type_icon && aRet.push('style="width:102px;"'), aRet.push('>                <div class="media-main">                    '), aRet.push(data.type_icon ? '                        <img src="' + data.page_pic + '" height="80" width="102">                        <img src="' + data.type_icon + '" style="position:absolute;top:0;left:0;width:26px;">                    ': '                        <img src="' + data.page_pic + '" height="64" width="64">                    '), aRet.push("                </div>            </div>        ")) : data.type_icon && aRet.push('            <div class="mod-media size-m" style="width:46px;height:80px;">                <div class="media-main">                    <img src="' + data.type_icon + '" style="position:absolute;top:0;left:0;width:26px;">                </div>             </div>        '), aRet.push('        <div class="box-col item-list">            '), data.content1 && aRet.push('            <div class="item-main txt-m mct-a" data-node="cTitle">' + data.content1 + "</div>            "), aRet.push("            "), data.content2 && aRet.push('            <div class="item-minor txt-s mct-d txt-cut" data-node="cDesc">' + data.content2 + "</div>            "), aRet.push("        </div>        "), aRet.push(function() {
			var a = require("tpl/common/arrowRight");
			return a(data)
		} ()), aRet.push("        "), data.buttons) {
			if (aRet.push("        "), data.buttons && data.buttons.constructor === Array) with({
				i: 0,
				l: data.buttons.length,
				btn_index: 0,
				btn: null
			}) for (i = l; i--;) btn_index = l - i - 1,
			btn = data.buttons[btn_index],
			aRet.push("            "),
			aRet.push(function() {
				var a = require("tpl/common/button");
				return a(btn)
			} ()),
			aRet.push("        ");
			aRet.push("        ")
		}
		return aRet.push("    </div></div>"),
		aRet.join("")
	}
}),
define("tpl/card/sp5",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (!data || "object" != typeof data) return "";
		if (aRet.push("    "), data.cards && data.cards.constructor === Array) with({
			i: 0,
			l: data.cards.length,
			card_index: 0,
			card: null
		}) for (i = l; i--;) card_index = l - i - 1,
		card = data.cards[card_index],
		aRet.push("        "),
		2 == card.type || 12 == card.type ? (aRet.push("            "), aRet.push(function() {
			var a = require("tpl/card/sp2");
			return a(card)
		} ()), aRet.push("        ")) : 13 == card.type && (aRet.push("            "), aRet.push(function() {
			var a = require("tpl/card/sp13");
			return a(card)
		} ()), aRet.push("        ")),
		aRet.push("    ");
		return aRet.join("")
	}
}),
define("tpl/card/sp13",
function(require, a, b) {
	require("sdk/tplutil");
	b.exports = function(a) {
		var b = [];
		return a && "object" == typeof a ? (b.push('    <div style="margin-top:5px;" data-node="card" data-jump="' + a.page_url + '">         <img data-node="cImgPic" src="' + a.page_pic + '" style="width:100%;">    </div>'), b.join("")) : ""
	}
}),
define("tpl/card/sp0",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (!data || "object" != typeof data) return "";
		if (aRet.push('<div class="card card8" data-node="card" data-jump="' + data.page_url + '" data-act-type="hover">    <div class="layout-box media-graphic">        '), data.page_pic && aRet.push('        <div class="mod-media size-m">            <div class="media-main"><img data-node="cImg" src="' + data.page_pic + '" height="64" width="64"></div>         </div>        '), aRet.push('             <div class="box-col item-list">            '), data.page_title && aRet.push('            <div class="item-main txt-m mct-a txt-cut" data-node="cTitle">' + data.page_title + "</div>            "), aRet.push("            "), data.page_desc && aRet.push('            <div class="item-minor txt-s mct-d txt-cut" data-node="cDesc">' + data.page_desc + "</div>            "), aRet.push("            "), data.tips && aRet.push('            <div class="item-other txt-s mct-d txt-cut" data-node="cDesc">' + data.tips + "</div>            "), aRet.push("        </div>        "), aRet.push(function() {
			var a = require("tpl/common/arrowRight");
			return a(data)
		} ()), aRet.push("        "), data.buttons) {
			if (aRet.push("        "), data.buttons && data.buttons.constructor === Array) with({
				i: 0,
				l: data.buttons.length,
				btn_index: 0,
				btn: null
			}) for (i = l; i--;) btn_index = l - i - 1,
			btn = data.buttons[btn_index],
			aRet.push("            "),
			aRet.push(function() {
				var a = require("tpl/common/button");
				return a(btn)
			} ()),
			aRet.push("        ");
			aRet.push("        ")
		}
		return aRet.push("    </div></div>"),
		aRet.join("")
	}
}),
define("tpl/mod/module_comment",
function(require, exports, module) {
	require("sdk/tplutil");
	module.exports = function(data) {
		var aRet = [];
		if (aRet.push("<!--info--@title Comment评论 (mod module_comment)@category Module - 自定义模块@readme Comment评论 ---说明-->"), !data || "object" != typeof data) return "";
		if (aRet.push('<div class="module module_comment"><div class="info-bar"><div class="layout-box"><div class="box-col"><span class="info-txt mct-d">' + (data.forward_count || "") + '转发</span><span class="line-right"></span><span class="info-txt mct-a">' + (data.comment_count || "") + '评论<span class="arrow-up line-top"><em class="arrow-up-in line-left"></em></span></span></div><div class="plus"><span class="info-txt mct-d" action-type="like">' + (data.like_count || "") + '赞</span></div></div></div><div class="line-around comment-box">'), data.comment_list.length) {
			if (aRet.push('<ul class="comment-list line-top">'), data.comment_list && data.comment_list.constructor === Array) with({
				i: 0,
				l: data.comment_list.length,
				comment_index: 0,
				comment: null
			}) for (i = l; i--;) comment_index = l - i - 1,
			comment = data.comment_list[comment_index],
			aRet.push('<li class="layout-box media-graphic line-bottom">             <div class="mod-media size-xs">                <div class="media-main"><img src="' + comment.user.profile_image_url + '" height="34" width="34"></div>'),
			aRet.push(function() {
				var a = require("tpl/common/verified");
				return a(comment.user)
			} ()),
			aRet.push('            </div>            <div class="box-col item-list">                <div class="item-main txt-xs mct-a txt-cut">' + comment.user.screen_name + '</div>                <div class="item-minor txt-xs">                ' + comment.content + '                </div>                <div class="item-other txt-xxs mct-d txt-cut"><span class="time">' + comment.time + '</span><span class="from">来自' + comment.from + '</span></div>                        </div>            <span class="operate-box">            <em class="line-around btn-more mct-d"><span class="icon-font icon-font-dots"></span></em>            </span>        </li>');
			aRet.push("</ul>")
		} else aRet.push('<div class="zero-box line-top"><i class="icon-font icon-font-comment"></i><p class="mct-d txt-s">还没有人评论</p></div>');
		return aRet.push("</div></div>"),
		aRet.join("")
	}
});