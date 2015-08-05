define("act/acts",
function() {}),
define("act/btn_default",
function(require, a) {
	var b = require("jquery"),
	c = "接口请求失败！",
	d = require("tpl/common/button"),
	e = require("brick"),
	f = require("core/tplFunc").canAccessLink,
	g = require("core/io/trans")(),
	h = require("ux/alertPop"),
	i = g.json;
	a.events = {
		click: function(a, g, j) {
			function k(a, e) {
				i({
					url: a,
					dataType: "json",
					success: function(a) {
						if (l.data("loading", 0), 1 == a.ok) {
							if (a.button) {
								var f = d(a.button);
								b(g).replaceWith(f)
							}
						} else alert(a.msg || c);
						e && e.close()
					},
					error: function() {
						alert(c),
						l.data("loading", 0),
						e && e.close()
					}
				})
			}
			if (a.preventDefault(), !f) return e.notice.trigger("AccessDenied"),
			!1;
			var l = b(g);
			if (l.data("loading")) return ! 1;
			l.data("loading", 1);
			var m = decodeURIComponent(l.attr("href"));
			if (j.action && (m = decodeURIComponent(j.action)), -1 != m.indexOf("wbFilterCreate") && -1 != m.indexOf("rootid")) {
				var n = new h;
				n.init({
					wrapperId: "J-" + Date.now(),
					title: "确定屏蔽这条微博",
					label: '<input type="checkbox" checked/>&nbsp;同时屏蔽原微博及其转发微博',
					cancelBtn: {
						callback: function() {
							l.data("loading", 0)
						}
					},
					confirmBtn: {
						callback: function(a) {
							var b = a.find("input");
							b.prop("checked") ? k(m + "&root=1", n) : k(m, n)
						}
					}
				})
			} else k(m);
			return ! 1
		}
	}
}),
define("core/tplFunc",
function(require, a) {
	var b = require("core/util/keepParams"),
	c = require("core/util/checkLogin"),
	d = require("core/util/accessLevel");
	a.canAccessLink = function() {
		return ! (!c && $render_data.common.showPopLogin && 2 == d)
	} (),
	a.href = function(d) {
		var e = d;
		return d && ("object" != typeof d || (e = d.urls && d.urls.h5 || d.scheme)) ? !c && $render_data.common.showPopLogin ? "javascript:require(['brick'],function(brick){brick.notice.trigger('AccessDenied');});": a.canAccessLink ? 0 === e.indexOf("javascript:") ? e: b(e) : "javascript:require(['brick'],function(brick){brick.notice.trigger('AccessDenied');});": "javascript:;"
	}
}),
define("core/util/keepParams",
function(require, a, b) {
	b.exports = function(a, b) {
		var c,
		d = $render_data.common;
		return a && d && (c = b ? d.ajaxPassParams: d.passParams, c && (a += -1 != a.indexOf("?") ? "&" + c: "?" + c)),
		a
	}
}),
define("core/util/checkLogin",
function(require, a, b) {
	b.exports = function() {
		return ! (1 != $render_data.common.isLogin && 1 != $render_data.common.login)
	} ()
}),
define("core/util/accessLevel",
function(require, a, b) {
	b.exports = $render_data.common.seeLevel || 0
}),
define("core/io/trans",
function(require, a, b) {
	var c = require("core/util/keepParams"),
	d = require("../../ux/alertPop"),
	d = require("../../ux/alertPop");
	b.exports = function() {
		var a = {},
		b = {};
		return b.set = function(b, c) {
			if ("undefined" != typeof a[b]) throw b + " 接口已经被定义！";
			a[b] = c
		},
		b.get = function(c, d) {
			if ("undefined" == typeof a[c]) throw c + " 接口没有定义！";
			var e = $.extend({},
			a[c], d);
			b.json(e)
		},
		b.json = function(a) {
			a.url = c(a.url, !0),
			a.type = a.type || "get",
			a.dataType = a.dataType || "json",
			a.timeout = a.timeout || 1e3 * ("get" == a.type ? 30: 60);
			var b = a.success;
			a.success = function(e) {
				var f = ((new Date).getTime(), "" + e.ok);
				switch (f) {
				case "-3":
					alert("请输入验证码");
					break;
				case "-7":
					window.location.href = "/security?from=0";
					break;
				case "-8":
					window.location.href = "/security";
					break;
				case "-9":
					"post" == a.type.toLowerCase() ? (alert("您的帐号存在风险，系统暂时锁定了部分功能，请通过手机验证以恢复正常。"), location.href = "/security/readonly") : b(e);
					break;
				case "-9+225":
				case "-9+222":
					"post" == a.type.toLowerCase() ? ($(".toast-wrapper").addClass("hid"), (new d).init({
						wrapperId: "J-" + (new Date).getTime(),
						info: "您的帐号存在风险，系统暂时锁定了部分功能，请通过手机验证以恢复正常。",
						confirmBtn: {
							callback: function() {
								window.location.href = "/security/stolenReadOnly"
							}
						}
					})) : b(e);
					break;
				case "-98":
				case "-100":
					location.href = c(e.url || "/login?backUrl=" + decodeURIComponent(location.href));
					break;
				case "-255":
					alert("您的帐号疑似被盗，已经被系统锁定部分功能，为了保障您的帐号安全，请立即修改密码。"),
					location.href = "/security";
					break;
				case "403":
					alert("您输入的网址疑似为不安全链接，无法发表，请谅解。\n如需帮助，请联系客服。");
					break;
				case "2014":
					location.href = data.location;
					break;
				case "20046":
					"post" == a.type.toLowerCase() ? ($(".toast-wrapper").addClass("hid"), (new d).init({
						wrapperId: "J-" + (new Date).getTime(),
						info: "您的登录邮箱尚未验证，不能使用完整功能，请验证邮箱。",
						cancelBtn: {},
						confirmBtn: {
							callback: function() {
								window.location.href = "/edmActive?disable_sinaurl=1"
							}
						}
					})) : b(e);
					break;
				case "ag:4_st:3":
					"post" == a.type.toLowerCase() ? ($(".toast-wrapper").addClass("hid"), (new d).init({
						wrapperId: "J-" + (new Date).getTime(),
						info: "你的邮箱未激活！激活邮箱，即可使用邮箱和密码登录微博，安全又方便。",
						cancelBtn: !0,
						confirmBtn: {
							txt: "立即激活",
							callback: function() {
								window.location.href = "https://passport.sina.cn/bindname/mail?entry=mweibo"
							}
						}
					})) : b(e);
					break;
				default:
					b(e)
				}
			},
			$.ajax(a)
		},
		b
	}
}),
define("ux/alertPop",
function(require, a, b) {
	function c() {
		function a(a) {
			return m = a || {},
			a.wrapperId ? $("#" + a.wrapperId).size() ? void alert(a.wrapperId + " ID 已经被占用啦！") : (h = d(m), e.append(h), $("body").append(e), i = $("#" + (m.wrapperId || "J-alertPop")), j = i.find(".wrapper"), k = i.find("#" + (m.cancelBtn && m.cancelBtn.id || "J-alertPop-cancel")), l = i.find("#" + (m.confirmBtn && m.confirmBtn.id || "J-alertPop-confirm")), g(), i.removeClass("hid"), void f()) : void alert("alertPop 需要唯一标示 ID，庸人这么多，牵错手了可不是闹着玩儿的！")
		}
		function b(a, b, c) {
			var c = "number" == typeof c && c > 3e3 ? c: 3e3,
			d = a.parent().parent().find(".error-label");
			d.html(b || "请重新输入").removeClass("hid"),
			clearTimeout(n.errorTimer),
			n.errorTimer = setTimeout(function() {
				d.addClass("hid").html("")
			},
			c)
		}
		function c() {
			i.addClass("hid"),
			i.remove()
		}
		function f() {
			var a = $("body").outerHeight(!0),
			b = j.outerHeight(),
			c = j.outerWidth(),
			d = window.scrollY,
			e = window.innerHeight,
			f = window.innerWidth;
			j.css({
				top: (e - b) / 2 + d,
				left: (f - c) / 2
			}),
			i.css({
				height: a > e ? a: e
			})
		}
		function g() {
			l.on("click", o.confirm),
			k.on("click", o.cancel)
		}
		var h,
		i,
		j,
		k,
		l,
		m,
		n = {},
		o = {
			cancel: function() {
				var a = $(this);
				if (!a.hasClass("isDisabled")) return c(),
				m.cancelBtn && m.cancelBtn.callback && m.cancelBtn.callback.call(this, i),
				!1
			},
			confirm: function() {
				var a = $(this);
				if (!a.hasClass("isDisabled")) return m.confirmBtn && m.confirmBtn.callback ? m.confirmBtn.callback.call(this, i) : c(),
				!1
			}
		};
		return {
			init: a,
			showError: b,
			close: c
		}
	}
	var d = require("tpl/ux/alertPop"),
	e = $(document.createDocumentFragment());
	b.exports = c
}),
define("tpl/ux/alertPop",
function(require, a, b) {
	require("core/tplFunc");
	b.exports = function(a) {
		var b = '<div id="' + a.wrapperId + '" class="alert-wrapper hid"><article class="wrapper">';
		if (a.title && (b += '<header class="title">' + a.title + "</header>"), b += " ", a.info && (b += '<span class="info">' + a.info + "</span>"), b += " ", a.label && (b += '<span class="label">' + a.label + "</span>"), b += " ", a.inputArr && a.inputArr.length) {
			b += " ";
			var c = a.inputArr;
			if (c) for (var d, e = -1, f = c.length - 1; f > e;) {
				if (d = c[e += 1], b += '<div class="input-wrapper"><div class="input-item">', "object" == typeof d && d.length) {
					b += " ";
					var g = d;
					if (g) for (var h, i = -1, j = g.length - 1; j > i;) h = g[i += 1],
					b += '<input id="' + (h.id || "") + '" name="' + (h.name || "") + '" type="text" placeholder="' + (h.placeholder || "") + '"/>';
					b += " "
				} else b += '<input id="' + (d.id || "") + '" name="' + (d.name || "") + '" type="text" placeholder="' + (d.placeholder || "") + '"/>';
				b += '</div><p class="error-label hid"></p></div>'
			}
			b += " "
		}
		return b += '<div class="action">',
		(a.cancelBtn || !a.cancelBtn && !a.confirmBtn) && (b += '<a id="' + (a.cancelBtn && a.cancelBtn.id || "J-alertPop-cancel") + '" href="javascript:void(0);" class="btn cancel-btn', a.cancelBtn && a.cancelBtn.isDisabled && (b += " isDisabled"), b += '">' + (a.cancelBtn && a.cancelBtn.txt || "取消") + "</a>"),
		b += " ",
		a.confirmBtn && (b += '<a id="' + (a.confirmBtn && a.confirmBtn.id || "J-alertPop-confirm") + '" href="javascript:void(0);" class="btn confirm-btn', a.confirmBtn && a.confirmBtn.isDisabled && (b += " isDisabled"), b += '">' + (a.confirmBtn && a.confirmBtn.txt || "确定") + "</a>"),
		b += "</div></article></div>"
	}
}),
define("act/follow",
function(require, a) {
	var b = require("jquery"),
	c = "接口请求失败！",
	d = require("brick"),
	e = require("core/tplFunc").canAccessLink,
	f = require("core/io/trans")(),
	g = f.json;
	a.events = {
		click: function(a, f, h) {
			if (a.preventDefault(), !e) return d.notice.trigger("AccessDenied"),
			!1; {
				var i = "cover" == h.position;
				"1" == h.sub_type
			}
			if (1 == h.sub_type && !i) return ! 1;
			var j = b(f),
			k = j.data("act-url") || j.attr("href");
			return g({
				url: k,
				type: "POST",
				dataType: "json",
				data: {
					sub_type: h.sub_type
				},
				success: function(a) {
					1 == a.ok ? a.button && (i ? require(["tpl/mod/_cover_btn"],
					function(b) {
						var c = b(a.button);
						j.replaceWith(c)
					}) : require(["tpl/common/button"],
					function(b) {
						var c = b(a.button);
						j.replaceWith(c)
					})) : alert(a.msg || c)
				}
			}),
			!1
		}
	}
}),
define("act/hover",
function(require, a) {
	function b() {
		c && c.removeClass("active"),
		c = 0,
		d(document).off("touchend touchmove mouseup mousemove", b)
	}
	var c,
	d = require("jquery"),
	e = (require("brick"), require("core/io/actLog"));
	a.events = {
		"touchstart mousedown": function(a, e) {
			a.stopPropagation(),
			b(),
			c = d(e),
			setTimeout(function() {
				c && c.addClass("active")
			},
			55),
			d(document).on("touchend touchmove mouseup mousemove click", b)
		},
		click: function(a, b) {
			a.stopPropagation(),
			c = d(b);
			var f = c.data("jump");
			return f && (c.data("actcode") ? e(c.data("actcode"),
			function() {
				location.href = f
			}) : location.href = f),
			!1
		}
	}
}),
define("core/io/actLog",
function(require, a, b) {
	b.exports = function(a, b) {
		if (a) {
			var c = "/h5logs/actionLog?type=pic&act_code=" + a + "&t=" + (new Date).getTime(),
			d = require("core/util/keepParams");
			c = d(c, !0);
			var e = new Image;
			b && (e.onload = b, e.onerror = b),
			e.src = c
		}
	}
}),
define("act/like",
function(require, a) {
	var b = require("jquery"),
	c = "接口请求失败！",
	d = require("brick"),
	e = require("core/tplFunc").canAccessLink,
	f = require("core/io/trans")(),
	g = f.json;
	a.events = {
		click: function(a, f, h) {
			if (a.preventDefault(), !e) return d.notice.trigger("AccessDenied"),
			!1; {
				var i = b(f),
				j = i.data("act-url") || i.attr("href"),
				k = "cover" == h.position;
				"1" == h.sub_type
			}
			return g({
				url: j,
				type: "POST",
				dataType: "json",
				data: {
					sub_type: h.sub_type
				},
				success: function(a) {
					1 == a.ok ? a.button && (k ? require(["tpl/mod/_cover_btn"],
					function(b) {
						i.replaceWith(b(a.button))
					}) : require(["tpl/common/button"],
					function(b) {
						i.replaceWith(b(a.button))
					})) : alert(a.msg || c)
				}
			}),
			!1
		}
	}
}),
define("act/link",
function(require, a) {
	var b = require("brick"),
	c = require("core/tplFunc").canAccessLink;
	a.events = {
		click: function(a, d) {
			if (a.stopPropagation(), !c) return b.notice.trigger("AccessDenied"),
			!1;
			var e = $(d),
			f = e.data("act-url");
			f && (location.href = f)
		}
	}
}),
define("act/picShow",
function(require, a) {
	var b = require("jquery");
	a.events = {
		click: function(a, c) {
			var d = b(c),
			e = d.data("src") || d.attr("src");
			e = e.replace(/\/\w+\//, "/large/"),
			require(["ux/picShow"],
			function(a) {
				new a({
					imgList: e
				})
			})
		}
	}
}),
define("act/relation",
function(require, a) {
	function b(a, b) {
		var c = require("ux/relationPop");
		c.init(a, b, $(".module-cover").find(".item-main").find("span").text())
	}
	function c(a, c, d, f) {
		e({
			url: "/attentionDeal/" + a + "?",
			dataType: "json",
			type: "POST",
			data: "uid=" + c,
			success: function(a) {
				if (1 == a.ok) {
					2 > d ? (d += 2, b(f, c)) : d -= 3,
					console.log(d);
					var e = {
						type: "relation",
						sub_type: d,
						uid: c
					},
					g = require("tpl/mod/_cover_btn")(e);
					f.replaceWith(g)
				}
			},
			error: function() {
				alert("操作失败，请稍后再试")
			}
		})
	}
	var d = require("core/io/trans")(),
	e = d.json,
	f = require("brick"),
	g = require("core/tplFunc").canAccessLink,
	d = require("core/io/trans")(),
	e = d.json;
	a.events = {
		click: function(a, d, e) {
			if (!g) return f.notice.trigger("AccessDenied"),
			!1;
			var h = $(d),
			i = h.data("act-uid"),
			j = parseInt(e.sub_type, 10);
			if (2 == j || 3 == j) return b(h, i),
			!1;
			if (4 == j);
			else {
				var k = "addAttention",
				l = "";
				if ((5 == j || 6 == j) && (k = "delPrivate", l = "你确定要关注，不再消悄悄关注吗？"), "" !== l && !confirm(l)) return ! 1;
				c(k, i, j, h)
			}
		}
	}
}),
define("ux/relationPop",
function(require, a, b) {
	function c(a, b, c) {
		return t = b,
		u = c,
		void 0 === typeof t ? void console.error("莫得 uid，哪个知道你要找谁噻？！") : a ? (v.isInit || ($("body").append(n), o = $("#J-relationPop"), p = o.find("#J-scroll"), q = o.find("#J-list"), r = o.find("#J-action"), f(), g()), o.removeClass("hid"), v.isInit = !0, e(a), void $(document).bind("click", w.clickToClose)) : void console.error("没有 $target 的手谕，relationPop 是不会现身的!")
	}
	function d() {
		if (s) {
			try {
				s.destory()
			} catch(a) {
				console.log(a)
			}
			s = null
		}
		h()
	}
	function e(a) {
		var b = a.offset(),
		c = b.top + a.outerHeight() + 10,
		d = b.left + a.outerWidth() / 2 - o.outerWidth() / 2 - 60,
		e = window.innerWidth - o.outerWidth() - 5;
		d = d > 5 ? d > e ? e: d: 5,
		o.css({
			top: c,
			left: d
		})
	}
	function f() {
		i.get("getGroupList", {
			data: "uid=" + t,
			success: function(a) {
				if (1 == a.ok) {
					var b = '<a href="javascript:;" id="J-addGroup" class="add-btn">新建分组</a>';
					$.each(a.data,
					function(a, c) {
						b += '<a href="javascript:;" data-id="' + a + '"' + (c.isin ? 'class="checked"': "") + ">" + c.gname + "</a>"
					}),
					o.find(".loadingLarge").remove(),
					p.append(b),
					require(["core/lib/iscroll"],
					function(a) {
						s = new a("#J-list", {
							scrollbars: !0,
							resizenable: !1,
							preventDefaultException: {
								tagName: /^(SPAN|A|INPUT|TEXTAREA|BUTTON|SELECT|IMG)$/
							}
						})
					})
				}
			}
		})
	}
	function g() {
		p.on("click", "a", w.changeGroup),
		p.on("click", "#J-addGroup", w.createGroup),
		r.on("click", "[data-action=unfollow]", w.unfollow),
		r.on("click", "[data-action=close]", w.clickToClose)
	}
	function h() {
		p.off("click", "a", w.changeGroup)
	}
	var i = require("conf/inter/relationPop"),
	j = require("tpl/ux/relationPop")(),
	k = require("ux/alertPop"),
	l = new k,
	m = new k,
	n = $(document.createDocumentFragment());
	n.append(j);
	var o,
	p,
	q,
	r,
	s,
	t,
	u,
	v = {},
	w = {
		createGroup: function() {
			l.init({
				wrapperId: "J-createGroup-pop",
				title: "创建分组",
				inputArr: [{
					id: "J-group-name",
					placeholder: "分组名称最多8个汉字"
				}],
				confirmBtn: {
					callback: function(a) {
						var b = a.find("#J-group-name"),
						c = String.prototype.trim.call(b.val()),
						d = c.replace(/[\u4E00-\u9FA5]/g, "aa");
						return "" == c ? void l.showError(b, "分组名称不能为空，请重新输入") : d.length > 16 ? void l.showError(b, "分组名称不能超过16个字符或8个汉字") : /^[a-zA-z0-9]*$/.test(d) ? (l.close(), void i.get("createGroup", {
							data: "&uid=" + t + "&gname=" + encodeURIComponent(c),
							success: function(a) {
								var c = "";
								1 === a.ok ? ($.each(a.data,
								function(a, b) {
									c += '<a href="javascript:;" data-id="' + a + '" class="checked">' + b + "</a>"
								}), b.val(""), p.append(c), s.refresh(), s.scrollToElement("a:last-child", 100)) : alert(a.msg)
							}
						})) : void l.showError(b, "分组名称由数字、字母、中文组成")
					}
				}
			})
		},
		changeGroup: function() {
			var a = $(this);
			if (!a.hasClass("add-btn")) {
				var b = a.hasClass("checked") ? "removeUserFromGroup": "addUserToGroup";
				a.addClass("loading"),
				i.get(b, {
					data: "&gid=" + a.data("id") + "&uid=" + t,
					success: function(b) {
						var c = b.ok,
						d = b.msg;
						a.removeClass("loading"),
						1 == c ? a.toggleClass("checked") : alert(d)
					}
				})
			}
		},
		unfollow: function() {
			m.init({
				wrapperId: "J-" + (new Date).getTime(),
				info: "确定不再关注 " + (u ? u: "用户名") + " 了？",
				confirmBtn: {
					callback: function() {
						i.get("unfollow", {
							data: "&uid=" + t,
							success: function(a) {
								1 == a.ok ? location.reload() : alert(a.msg),
								m.close()
							}
						})
					}
				}
			})
		},
		clickToClose: function(a) {
			var b = $(a.target);
			if (b.length) {
				var c = "J-relationPop" === b.attr("id"),
				d = b.parents("#J-list").size() > 0,
				e = "show-relationPop" === b.data("node") || b.parents('[data-node="show-relationPop"]').size() > 0;
				if (!c && !d && !e) return o.addClass("hid"),
				void $(document).unbind("click", w.clickToClose)
			}
			return ! 1
		}
	};
	b.exports = {
		init: c,
		destory: d
	}
}),
define("conf/inter/relationPop",
function(require, a, b) {
	var c = require("core/io/trans")();
	c.set("getGroupList", {
		url: "/attGroups/getAttGroupListByUid"
	}),
	c.set("createGroup", {
		url: "/attGroupsDeal/createAndAddGroup",
		type: "post"
	}),
	c.set("addUserToGroup", {
		url: "/attGroupsDeal/addUserToGroup",
		type: "post"
	}),
	c.set("removeUserFromGroup", {
		url: "/attGroupsDeal/moveUserFromGroup",
		type: "post"
	}),
	c.set("unfollow", {
		url: "/attentionDeal/delAttention",
		type: "post"
	}),
	b.exports = c
}),
define("tpl/ux/relationPop",
function(require, a, b) {
	require("core/tplFunc");
	b.exports = function() {
		var a = '<div class="relation-wrapper" id="J-relationPop"><div class="list" id="J-list"><div id="J-scroll"><div class="loadingLarge"></div></div></div><div class="action" id="J-action"><p class="layout-box"><a href="javascript:;" class="box-col" data-action="unfollow">取消关注</a><a href="javascript:;" class="box-col" data-action="close-relationPop">确定</a></p></div></div>';
		return a
	}
}),
define("tpl/mod/_cover_btn",
function(require, a, b) {
	require("core/tplFunc");
	b.exports = function(a) {
		var b = '<button class="btn btn-normal" data-act-type="' + a.type + '" data-act-data="sub_type=' + a.sub_type + '&position=cover"';
		return a.scheme && (b += ' data-act-url="' + a.scheme + '"'),
		a.uid && (b += ' data-act-uid="' + a.uid + '"'),
		a.like_count && (b += ' data-act-like-count="' + a.like_count + '"'),
		b += ">",
		a.type && "like" === a.type ? (b += " ", b += a.sub_type && 1 === a.sub_type ? '<i class="iconimg iconimg-xs icon icon-likedsmall"></i>': '<i class="iconimg iconimg-xs icon icon-likesmall"></i>', b += "<span>" + (a.name || "赞一下") + "</span>") : a.type && "follow" === a.type ? (b += " ", b += a.sub_type && 1 === a.sub_type ? '<i class="iconf iconf_userinfo_tick"></i><span>已关注</span>': '<i class="iconf iconf_userinfo_plus"></i><span>关注</span>', b += " ") : a.type && "relation" === a.type ? (b += " ", b += a.sub_type && 2 === a.sub_type ? '<i class="iconf iconf_userinfo_tick txt-xl"></i><span>已关注</span><i class="icon-font icon-font-arrow-down txt-xs"></i>': a.sub_type && 3 === a.sub_type ? '<i class="iconf iconf_userinfo_arrow txt-xl"></i><span>相互关注</span><i class="icon-font icon-font-arrow-down txt-xs"></i>': a.sub_type && 1 === a.sub_type ? '<i class="iconf iconf_userinfo_tick txt-xl"></i><span>加关注</span><i class="icon-font icon-font-arrow-down txt-xs"></i>': '<i class="iconf iconf_userinfo_plus txt-xl"></i><span>加关注</span>', b += " ") : (b += " ", a.icon ? b += '<i class="iconf ' + a.icon + ' txt-xl"></i>': a.pic && (b += '<i class="iconimg iconimg-xs"><img src="' + a.pic + '"></i>'), b += "<span>" + a.name + "</span>"),
		b += "</button>"
	}
}),
define("act/btn_default",
function(require, a) {
	var b = require("jquery"),
	c = "接口请求失败！",
	d = require("tpl/common/button"),
	e = require("brick"),
	f = require("core/tplFunc").canAccessLink,
	g = require("core/io/trans")(),
	h = require("ux/alertPop"),
	i = g.json;
	a.events = {
		click: function(a, g, j) {
			function k(a, e) {
				i({
					url: a,
					dataType: "json",
					success: function(a) {
						if (l.data("loading", 0), 1 == a.ok) {
							if (a.button) {
								var f = d(a.button);
								b(g).replaceWith(f)
							}
						} else alert(a.msg || c);
						e && e.close()
					},
					error: function() {
						alert(c),
						l.data("loading", 0),
						e && e.close()
					}
				})
			}
			if (a.preventDefault(), !f) return e.notice.trigger("AccessDenied"),
			!1;
			var l = b(g);
			if (l.data("loading")) return ! 1;
			l.data("loading", 1);
			var m = decodeURIComponent(l.attr("href"));
			if (j.action && (m = decodeURIComponent(j.action)), -1 != m.indexOf("wbFilterCreate") && -1 != m.indexOf("rootid")) {
				var n = new h;
				n.init({
					wrapperId: "J-" + Date.now(),
					title: "确定屏蔽这条微博",
					label: '<input type="checkbox" checked/>&nbsp;同时屏蔽原微博及其转发微博',
					cancelBtn: {
						callback: function() {
							l.data("loading", 0)
						}
					},
					confirmBtn: {
						callback: function(a) {
							var b = a.find("input");
							b.prop("checked") ? k(m + "&root=1", n) : k(m, n)
						}
					}
				})
			} else k(m);
			return ! 1
		}
	}
}),
define("core/tplFunc",
function(require, a) {
	var b = require("core/util/keepParams"),
	c = require("core/util/checkLogin"),
	d = require("core/util/accessLevel");
	a.canAccessLink = function() {
		return ! (!c && $render_data.common.showPopLogin && 2 == d)
	} (),
	a.href = function(d) {
		var e = d;
		return d && ("object" != typeof d || (e = d.urls && d.urls.h5 || d.scheme)) ? !c && $render_data.common.showPopLogin ? "javascript:require(['brick'],function(brick){brick.notice.trigger('AccessDenied');});": a.canAccessLink ? 0 === e.indexOf("javascript:") ? e: b(e) : "javascript:require(['brick'],function(brick){brick.notice.trigger('AccessDenied');});": "javascript:;"
	}
}),
define("core/util/keepParams",
function(require, a, b) {
	b.exports = function(a, b) {
		var c,
		d = $render_data.common;
		return a && d && (c = b ? d.ajaxPassParams: d.passParams, c && (a += -1 != a.indexOf("?") ? "&" + c: "?" + c)),
		a
	}
}),
define("core/util/checkLogin",
function(require, a, b) {
	b.exports = function() {
		return ! (1 != $render_data.common.isLogin && 1 != $render_data.common.login)
	} ()
}),
define("core/util/accessLevel",
function(require, a, b) {
	b.exports = $render_data.common.seeLevel || 0
}),
define("core/io/trans",
function(require, a, b) {
	var c = require("core/util/keepParams"),
	d = require("../../ux/alertPop"),
	d = require("../../ux/alertPop");
	b.exports = function() {
		var a = {},
		b = {};
		return b.set = function(b, c) {
			if ("undefined" != typeof a[b]) throw b + " 接口已经被定义！";
			a[b] = c
		},
		b.get = function(c, d) {
			if ("undefined" == typeof a[c]) throw c + " 接口没有定义！";
			var e = $.extend({},
			a[c], d);
			b.json(e)
		},
		b.json = function(a) {
			a.url = c(a.url, !0),
			a.type = a.type || "get",
			a.dataType = a.dataType || "json",
			a.timeout = a.timeout || 1e3 * ("get" == a.type ? 30: 60);
			var b = a.success;
			a.success = function(e) {
				var f = ((new Date).getTime(), "" + e.ok);
				switch (f) {
				case "-3":
					alert("请输入验证码");
					break;
				case "-7":
					window.location.href = "/security?from=0";
					break;
				case "-8":
					window.location.href = "/security";
					break;
				case "-9":
					"post" == a.type.toLowerCase() ? (alert("您的帐号存在风险，系统暂时锁定了部分功能，请通过手机验证以恢复正常。"), location.href = "/security/readonly") : b(e);
					break;
				case "-9+225":
				case "-9+222":
					"post" == a.type.toLowerCase() ? ($(".toast-wrapper").addClass("hid"), (new d).init({
						wrapperId: "J-" + (new Date).getTime(),
						info: "您的帐号存在风险，系统暂时锁定了部分功能，请通过手机验证以恢复正常。",
						confirmBtn: {
							callback: function() {
								window.location.href = "/security/stolenReadOnly"
							}
						}
					})) : b(e);
					break;
				case "-98":
				case "-100":
					location.href = c(e.url || "/login?backUrl=" + decodeURIComponent(location.href));
					break;
				case "-255":
					alert("您的帐号疑似被盗，已经被系统锁定部分功能，为了保障您的帐号安全，请立即修改密码。"),
					location.href = "/security";
					break;
				case "403":
					alert("您输入的网址疑似为不安全链接，无法发表，请谅解。\n如需帮助，请联系客服。");
					break;
				case "2014":
					location.href = data.location;
					break;
				case "20046":
					"post" == a.type.toLowerCase() ? ($(".toast-wrapper").addClass("hid"), (new d).init({
						wrapperId: "J-" + (new Date).getTime(),
						info: "您的登录邮箱尚未验证，不能使用完整功能，请验证邮箱。",
						cancelBtn: {},
						confirmBtn: {
							callback: function() {
								window.location.href = "/edmActive?disable_sinaurl=1"
							}
						}
					})) : b(e);
					break;
				case "ag:4_st:3":
					"post" == a.type.toLowerCase() ? ($(".toast-wrapper").addClass("hid"), (new d).init({
						wrapperId: "J-" + (new Date).getTime(),
						info: "你的邮箱未激活！激活邮箱，即可使用邮箱和密码登录微博，安全又方便。",
						cancelBtn: !0,
						confirmBtn: {
							txt: "立即激活",
							callback: function() {
								window.location.href = "https://passport.sina.cn/bindname/mail?entry=mweibo"
							}
						}
					})) : b(e);
					break;
				default:
					b(e)
				}
			},
			$.ajax(a)
		},
		b
	}
}),
define("ux/alertPop",
function(require, a, b) {
	function c() {
		function a(a) {
			return m = a || {},
			a.wrapperId ? $("#" + a.wrapperId).size() ? void alert(a.wrapperId + " ID 已经被占用啦！") : (h = d(m), e.append(h), $("body").append(e), i = $("#" + (m.wrapperId || "J-alertPop")), j = i.find(".wrapper"), k = i.find("#" + (m.cancelBtn && m.cancelBtn.id || "J-alertPop-cancel")), l = i.find("#" + (m.confirmBtn && m.confirmBtn.id || "J-alertPop-confirm")), g(), i.removeClass("hid"), void f()) : void alert("alertPop 需要唯一标示 ID，庸人这么多，牵错手了可不是闹着玩儿的！")
		}
		function b(a, b, c) {
			var c = "number" == typeof c && c > 3e3 ? c: 3e3,
			d = a.parent().parent().find(".error-label");
			d.html(b || "请重新输入").removeClass("hid"),
			clearTimeout(n.errorTimer),
			n.errorTimer = setTimeout(function() {
				d.addClass("hid").html("")
			},
			c)
		}
		function c() {
			i.addClass("hid"),
			i.remove()
		}
		function f() {
			var a = $("body").outerHeight(!0),
			b = j.outerHeight(),
			c = j.outerWidth(),
			d = window.scrollY,
			e = window.innerHeight,
			f = window.innerWidth;
			j.css({
				top: (e - b) / 2 + d,
				left: (f - c) / 2
			}),
			i.css({
				height: a > e ? a: e
			})
		}
		function g() {
			l.on("click", o.confirm),
			k.on("click", o.cancel)
		}
		var h,
		i,
		j,
		k,
		l,
		m,
		n = {},
		o = {
			cancel: function() {
				var a = $(this);
				if (!a.hasClass("isDisabled")) return c(),
				m.cancelBtn && m.cancelBtn.callback && m.cancelBtn.callback.call(this, i),
				!1
			},
			confirm: function() {
				var a = $(this);
				if (!a.hasClass("isDisabled")) return m.confirmBtn && m.confirmBtn.callback ? m.confirmBtn.callback.call(this, i) : c(),
				!1
			}
		};
		return {
			init: a,
			showError: b,
			close: c
		}
	}
	var d = require("tpl/ux/alertPop"),
	e = $(document.createDocumentFragment());
	b.exports = c
}),
define("tpl/ux/alertPop",
function(require, a, b) {
	require("core/tplFunc");
	b.exports = function(a) {
		var b = '<div id="' + a.wrapperId + '" class="alert-wrapper hid"><article class="wrapper">';
		if (a.title && (b += '<header class="title">' + a.title + "</header>"), b += " ", a.info && (b += '<span class="info">' + a.info + "</span>"), b += " ", a.label && (b += '<span class="label">' + a.label + "</span>"), b += " ", a.inputArr && a.inputArr.length) {
			b += " ";
			var c = a.inputArr;
			if (c) for (var d, e = -1, f = c.length - 1; f > e;) {
				if (d = c[e += 1], b += '<div class="input-wrapper"><div class="input-item">', "object" == typeof d && d.length) {
					b += " ";
					var g = d;
					if (g) for (var h, i = -1, j = g.length - 1; j > i;) h = g[i += 1],
					b += '<input id="' + (h.id || "") + '" name="' + (h.name || "") + '" type="text" placeholder="' + (h.placeholder || "") + '"/>';
					b += " "
				} else b += '<input id="' + (d.id || "") + '" name="' + (d.name || "") + '" type="text" placeholder="' + (d.placeholder || "") + '"/>';
				b += '</div><p class="error-label hid"></p></div>'
			}
			b += " "
		}
		return b += '<div class="action">',
		(a.cancelBtn || !a.cancelBtn && !a.confirmBtn) && (b += '<a id="' + (a.cancelBtn && a.cancelBtn.id || "J-alertPop-cancel") + '" href="javascript:void(0);" class="btn cancel-btn', a.cancelBtn && a.cancelBtn.isDisabled && (b += " isDisabled"), b += '">' + (a.cancelBtn && a.cancelBtn.txt || "取消") + "</a>"),
		b += " ",
		a.confirmBtn && (b += '<a id="' + (a.confirmBtn && a.confirmBtn.id || "J-alertPop-confirm") + '" href="javascript:void(0);" class="btn confirm-btn', a.confirmBtn && a.confirmBtn.isDisabled && (b += " isDisabled"), b += '">' + (a.confirmBtn && a.confirmBtn.txt || "确定") + "</a>"),
		b += "</div></article></div>"
	}
}),
define("act/follow",
function(require, a) {
	var b = require("jquery"),
	c = "接口请求失败！",
	d = require("brick"),
	e = require("core/tplFunc").canAccessLink,
	f = require("core/io/trans")(),
	g = f.json;
	a.events = {
		click: function(a, f, h) {
			if (a.preventDefault(), !e) return d.notice.trigger("AccessDenied"),
			!1; {
				var i = "cover" == h.position;
				"1" == h.sub_type
			}
			if (1 == h.sub_type && !i) return ! 1;
			var j = b(f),
			k = j.data("act-url") || j.attr("href");
			return g({
				url: k,
				type: "POST",
				dataType: "json",
				data: {
					sub_type: h.sub_type
				},
				success: function(a) {
					1 == a.ok ? a.button && (i ? require(["tpl/mod/_cover_btn"],
					function(b) {
						var c = b(a.button);
						j.replaceWith(c)
					}) : require(["tpl/common/button"],
					function(b) {
						var c = b(a.button);
						j.replaceWith(c)
					})) : alert(a.msg || c)
				}
			}),
			!1
		}
	}
}),
define("core/tplFunc",
function(require, a) {
	var b = require("core/util/keepParams"),
	c = require("core/util/checkLogin"),
	d = require("core/util/accessLevel");
	a.canAccessLink = function() {
		return ! (!c && $render_data.common.showPopLogin && 2 == d)
	} (),
	a.href = function(d) {
		var e = d;
		return d && ("object" != typeof d || (e = d.urls && d.urls.h5 || d.scheme)) ? !c && $render_data.common.showPopLogin ? "javascript:require(['brick'],function(brick){brick.notice.trigger('AccessDenied');});": a.canAccessLink ? 0 === e.indexOf("javascript:") ? e: b(e) : "javascript:require(['brick'],function(brick){brick.notice.trigger('AccessDenied');});": "javascript:;"
	}
}),
define("core/util/keepParams",
function(require, a, b) {
	b.exports = function(a, b) {
		var c,
		d = $render_data.common;
		return a && d && (c = b ? d.ajaxPassParams: d.passParams, c && (a += -1 != a.indexOf("?") ? "&" + c: "?" + c)),
		a
	}
}),
define("core/util/checkLogin",
function(require, a, b) {
	b.exports = function() {
		return ! (1 != $render_data.common.isLogin && 1 != $render_data.common.login)
	} ()
}),
define("core/util/accessLevel",
function(require, a, b) {
	b.exports = $render_data.common.seeLevel || 0
}),
define("core/io/trans",
function(require, a, b) {
	var c = require("core/util/keepParams"),
	d = require("../../ux/alertPop"),
	d = require("../../ux/alertPop");
	b.exports = function() {
		var a = {},
		b = {};
		return b.set = function(b, c) {
			if ("undefined" != typeof a[b]) throw b + " 接口已经被定义！";
			a[b] = c
		},
		b.get = function(c, d) {
			if ("undefined" == typeof a[c]) throw c + " 接口没有定义！";
			var e = $.extend({},
			a[c], d);
			b.json(e)
		},
		b.json = function(a) {
			a.url = c(a.url, !0),
			a.type = a.type || "get",
			a.dataType = a.dataType || "json",
			a.timeout = a.timeout || 1e3 * ("get" == a.type ? 30: 60);
			var b = a.success;
			a.success = function(e) {
				var f = ((new Date).getTime(), "" + e.ok);
				switch (f) {
				case "-3":
					alert("请输入验证码");
					break;
				case "-7":
					window.location.href = "/security?from=0";
					break;
				case "-8":
					window.location.href = "/security";
					break;
				case "-9":
					"post" == a.type.toLowerCase() ? (alert("您的帐号存在风险，系统暂时锁定了部分功能，请通过手机验证以恢复正常。"), location.href = "/security/readonly") : b(e);
					break;
				case "-9+225":
				case "-9+222":
					"post" == a.type.toLowerCase() ? ($(".toast-wrapper").addClass("hid"), (new d).init({
						wrapperId: "J-" + (new Date).getTime(),
						info: "您的帐号存在风险，系统暂时锁定了部分功能，请通过手机验证以恢复正常。",
						confirmBtn: {
							callback: function() {
								window.location.href = "/security/stolenReadOnly"
							}
						}
					})) : b(e);
					break;
				case "-98":
				case "-100":
					location.href = c(e.url || "/login?backUrl=" + decodeURIComponent(location.href));
					break;
				case "-255":
					alert("您的帐号疑似被盗，已经被系统锁定部分功能，为了保障您的帐号安全，请立即修改密码。"),
					location.href = "/security";
					break;
				case "403":
					alert("您输入的网址疑似为不安全链接，无法发表，请谅解。\n如需帮助，请联系客服。");
					break;
				case "2014":
					location.href = data.location;
					break;
				case "20046":
					"post" == a.type.toLowerCase() ? ($(".toast-wrapper").addClass("hid"), (new d).init({
						wrapperId: "J-" + (new Date).getTime(),
						info: "您的登录邮箱尚未验证，不能使用完整功能，请验证邮箱。",
						cancelBtn: {},
						confirmBtn: {
							callback: function() {
								window.location.href = "/edmActive?disable_sinaurl=1"
							}
						}
					})) : b(e);
					break;
				case "ag:4_st:3":
					"post" == a.type.toLowerCase() ? ($(".toast-wrapper").addClass("hid"), (new d).init({
						wrapperId: "J-" + (new Date).getTime(),
						info: "你的邮箱未激活！激活邮箱，即可使用邮箱和密码登录微博，安全又方便。",
						cancelBtn: !0,
						confirmBtn: {
							txt: "立即激活",
							callback: function() {
								window.location.href = "https://passport.sina.cn/bindname/mail?entry=mweibo"
							}
						}
					})) : b(e);
					break;
				default:
					b(e)
				}
			},
			$.ajax(a)
		},
		b
	}
}),
define("ux/alertPop",
function(require, a, b) {
	function c() {
		function a(a) {
			return m = a || {},
			a.wrapperId ? $("#" + a.wrapperId).size() ? void alert(a.wrapperId + " ID 已经被占用啦！") : (h = d(m), e.append(h), $("body").append(e), i = $("#" + (m.wrapperId || "J-alertPop")), j = i.find(".wrapper"), k = i.find("#" + (m.cancelBtn && m.cancelBtn.id || "J-alertPop-cancel")), l = i.find("#" + (m.confirmBtn && m.confirmBtn.id || "J-alertPop-confirm")), g(), i.removeClass("hid"), void f()) : void alert("alertPop 需要唯一标示 ID，庸人这么多，牵错手了可不是闹着玩儿的！")
		}
		function b(a, b, c) {
			var c = "number" == typeof c && c > 3e3 ? c: 3e3,
			d = a.parent().parent().find(".error-label");
			d.html(b || "请重新输入").removeClass("hid"),
			clearTimeout(n.errorTimer),
			n.errorTimer = setTimeout(function() {
				d.addClass("hid").html("")
			},
			c)
		}
		function c() {
			i.addClass("hid"),
			i.remove()
		}
		function f() {
			var a = $("body").outerHeight(!0),
			b = j.outerHeight(),
			c = j.outerWidth(),
			d = window.scrollY,
			e = window.innerHeight,
			f = window.innerWidth;
			j.css({
				top: (e - b) / 2 + d,
				left: (f - c) / 2
			}),
			i.css({
				height: a > e ? a: e
			})
		}
		function g() {
			l.on("click", o.confirm),
			k.on("click", o.cancel)
		}
		var h,
		i,
		j,
		k,
		l,
		m,
		n = {},
		o = {
			cancel: function() {
				var a = $(this);
				if (!a.hasClass("isDisabled")) return c(),
				m.cancelBtn && m.cancelBtn.callback && m.cancelBtn.callback.call(this, i),
				!1
			},
			confirm: function() {
				var a = $(this);
				if (!a.hasClass("isDisabled")) return m.confirmBtn && m.confirmBtn.callback ? m.confirmBtn.callback.call(this, i) : c(),
				!1
			}
		};
		return {
			init: a,
			showError: b,
			close: c
		}
	}
	var d = require("tpl/ux/alertPop"),
	e = $(document.createDocumentFragment());
	b.exports = c
}),
define("tpl/ux/alertPop",
function(require, a, b) {
	require("core/tplFunc");
	b.exports = function(a) {
		var b = '<div id="' + a.wrapperId + '" class="alert-wrapper hid"><article class="wrapper">';
		if (a.title && (b += '<header class="title">' + a.title + "</header>"), b += " ", a.info && (b += '<span class="info">' + a.info + "</span>"), b += " ", a.label && (b += '<span class="label">' + a.label + "</span>"), b += " ", a.inputArr && a.inputArr.length) {
			b += " ";
			var c = a.inputArr;
			if (c) for (var d, e = -1, f = c.length - 1; f > e;) {
				if (d = c[e += 1], b += '<div class="input-wrapper"><div class="input-item">', "object" == typeof d && d.length) {
					b += " ";
					var g = d;
					if (g) for (var h, i = -1, j = g.length - 1; j > i;) h = g[i += 1],
					b += '<input id="' + (h.id || "") + '" name="' + (h.name || "") + '" type="text" placeholder="' + (h.placeholder || "") + '"/>';
					b += " "
				} else b += '<input id="' + (d.id || "") + '" name="' + (d.name || "") + '" type="text" placeholder="' + (d.placeholder || "") + '"/>';
				b += '</div><p class="error-label hid"></p></div>'
			}
			b += " "
		}
		return b += '<div class="action">',
		(a.cancelBtn || !a.cancelBtn && !a.confirmBtn) && (b += '<a id="' + (a.cancelBtn && a.cancelBtn.id || "J-alertPop-cancel") + '" href="javascript:void(0);" class="btn cancel-btn', a.cancelBtn && a.cancelBtn.isDisabled && (b += " isDisabled"), b += '">' + (a.cancelBtn && a.cancelBtn.txt || "取消") + "</a>"),
		b += " ",
		a.confirmBtn && (b += '<a id="' + (a.confirmBtn && a.confirmBtn.id || "J-alertPop-confirm") + '" href="javascript:void(0);" class="btn confirm-btn', a.confirmBtn && a.confirmBtn.isDisabled && (b += " isDisabled"), b += '">' + (a.confirmBtn && a.confirmBtn.txt || "确定") + "</a>"),
		b += "</div></article></div>"
	}
}),
define("act/hover",
function(require, a) {
	function b() {
		c && c.removeClass("active"),
		c = 0,
		d(document).off("touchend touchmove mouseup mousemove", b)
	}
	var c,
	d = require("jquery"),
	e = (require("brick"), require("core/io/actLog"));
	a.events = {
		"touchstart mousedown": function(a, e) {
			a.stopPropagation(),
			b(),
			c = d(e),
			setTimeout(function() {
				c && c.addClass("active")
			},
			55),
			d(document).on("touchend touchmove mouseup mousemove click", b)
		},
		click: function(a, b) {
			a.stopPropagation(),
			c = d(b);
			var f = c.data("jump");
			return f && (c.data("actcode") ? e(c.data("actcode"),
			function() {
				location.href = f
			}) : location.href = f),
			!1
		}
	}
}),
define("core/io/actLog",
function(require, a, b) {
	b.exports = function(a, b) {
		if (a) {
			var c = "/h5logs/actionLog?type=pic&act_code=" + a + "&t=" + (new Date).getTime(),
			d = require("core/util/keepParams");
			c = d(c, !0);
			var e = new Image;
			b && (e.onload = b, e.onerror = b),
			e.src = c
		}
	}
}),
define("core/util/keepParams",
function(require, a, b) {
	b.exports = function(a, b) {
		var c,
		d = $render_data.common;
		return a && d && (c = b ? d.ajaxPassParams: d.passParams, c && (a += -1 != a.indexOf("?") ? "&" + c: "?" + c)),
		a
	}
}),
define("act/like",
function(require, a) {
	var b = require("jquery"),
	c = "接口请求失败！",
	d = require("brick"),
	e = require("core/tplFunc").canAccessLink,
	f = require("core/io/trans")(),
	g = f.json;
	a.events = {
		click: function(a, f, h) {
			if (a.preventDefault(), !e) return d.notice.trigger("AccessDenied"),
			!1; {
				var i = b(f),
				j = i.data("act-url") || i.attr("href"),
				k = "cover" == h.position;
				"1" == h.sub_type
			}
			return g({
				url: j,
				type: "POST",
				dataType: "json",
				data: {
					sub_type: h.sub_type
				},
				success: function(a) {
					1 == a.ok ? a.button && (k ? require(["tpl/mod/_cover_btn"],
					function(b) {
						i.replaceWith(b(a.button))
					}) : require(["tpl/common/button"],
					function(b) {
						i.replaceWith(b(a.button))
					})) : alert(a.msg || c)
				}
			}),
			!1
		}
	}
}),
define("core/tplFunc",
function(require, a) {
	var b = require("core/util/keepParams"),
	c = require("core/util/checkLogin"),
	d = require("core/util/accessLevel");
	a.canAccessLink = function() {
		return ! (!c && $render_data.common.showPopLogin && 2 == d)
	} (),
	a.href = function(d) {
		var e = d;
		return d && ("object" != typeof d || (e = d.urls && d.urls.h5 || d.scheme)) ? !c && $render_data.common.showPopLogin ? "javascript:require(['brick'],function(brick){brick.notice.trigger('AccessDenied');});": a.canAccessLink ? 0 === e.indexOf("javascript:") ? e: b(e) : "javascript:require(['brick'],function(brick){brick.notice.trigger('AccessDenied');});": "javascript:;"
	}
}),
define("core/util/keepParams",
function(require, a, b) {
	b.exports = function(a, b) {
		var c,
		d = $render_data.common;
		return a && d && (c = b ? d.ajaxPassParams: d.passParams, c && (a += -1 != a.indexOf("?") ? "&" + c: "?" + c)),
		a
	}
}),
define("core/util/checkLogin",
function(require, a, b) {
	b.exports = function() {
		return ! (1 != $render_data.common.isLogin && 1 != $render_data.common.login)
	} ()
}),
define("core/util/accessLevel",
function(require, a, b) {
	b.exports = $render_data.common.seeLevel || 0
}),
define("core/io/trans",
function(require, a, b) {
	var c = require("core/util/keepParams"),
	d = require("../../ux/alertPop"),
	d = require("../../ux/alertPop");
	b.exports = function() {
		var a = {},
		b = {};
		return b.set = function(b, c) {
			if ("undefined" != typeof a[b]) throw b + " 接口已经被定义！";
			a[b] = c
		},
		b.get = function(c, d) {
			if ("undefined" == typeof a[c]) throw c + " 接口没有定义！";
			var e = $.extend({},
			a[c], d);
			b.json(e)
		},
		b.json = function(a) {
			a.url = c(a.url, !0),
			a.type = a.type || "get",
			a.dataType = a.dataType || "json",
			a.timeout = a.timeout || 1e3 * ("get" == a.type ? 30: 60);
			var b = a.success;
			a.success = function(e) {
				var f = ((new Date).getTime(), "" + e.ok);
				switch (f) {
				case "-3":
					alert("请输入验证码");
					break;
				case "-7":
					window.location.href = "/security?from=0";
					break;
				case "-8":
					window.location.href = "/security";
					break;
				case "-9":
					"post" == a.type.toLowerCase() ? (alert("您的帐号存在风险，系统暂时锁定了部分功能，请通过手机验证以恢复正常。"), location.href = "/security/readonly") : b(e);
					break;
				case "-9+225":
				case "-9+222":
					"post" == a.type.toLowerCase() ? ($(".toast-wrapper").addClass("hid"), (new d).init({
						wrapperId: "J-" + (new Date).getTime(),
						info: "您的帐号存在风险，系统暂时锁定了部分功能，请通过手机验证以恢复正常。",
						confirmBtn: {
							callback: function() {
								window.location.href = "/security/stolenReadOnly"
							}
						}
					})) : b(e);
					break;
				case "-98":
				case "-100":
					location.href = c(e.url || "/login?backUrl=" + decodeURIComponent(location.href));
					break;
				case "-255":
					alert("您的帐号疑似被盗，已经被系统锁定部分功能，为了保障您的帐号安全，请立即修改密码。"),
					location.href = "/security";
					break;
				case "403":
					alert("您输入的网址疑似为不安全链接，无法发表，请谅解。\n如需帮助，请联系客服。");
					break;
				case "2014":
					location.href = data.location;
					break;
				case "20046":
					"post" == a.type.toLowerCase() ? ($(".toast-wrapper").addClass("hid"), (new d).init({
						wrapperId: "J-" + (new Date).getTime(),
						info: "您的登录邮箱尚未验证，不能使用完整功能，请验证邮箱。",
						cancelBtn: {},
						confirmBtn: {
							callback: function() {
								window.location.href = "/edmActive?disable_sinaurl=1"
							}
						}
					})) : b(e);
					break;
				case "ag:4_st:3":
					"post" == a.type.toLowerCase() ? ($(".toast-wrapper").addClass("hid"), (new d).init({
						wrapperId: "J-" + (new Date).getTime(),
						info: "你的邮箱未激活！激活邮箱，即可使用邮箱和密码登录微博，安全又方便。",
						cancelBtn: !0,
						confirmBtn: {
							txt: "立即激活",
							callback: function() {
								window.location.href = "https://passport.sina.cn/bindname/mail?entry=mweibo"
							}
						}
					})) : b(e);
					break;
				default:
					b(e)
				}
			},
			$.ajax(a)
		},
		b
	}
}),
define("ux/alertPop",
function(require, a, b) {
	function c() {
		function a(a) {
			return m = a || {},
			a.wrapperId ? $("#" + a.wrapperId).size() ? void alert(a.wrapperId + " ID 已经被占用啦！") : (h = d(m), e.append(h), $("body").append(e), i = $("#" + (m.wrapperId || "J-alertPop")), j = i.find(".wrapper"), k = i.find("#" + (m.cancelBtn && m.cancelBtn.id || "J-alertPop-cancel")), l = i.find("#" + (m.confirmBtn && m.confirmBtn.id || "J-alertPop-confirm")), g(), i.removeClass("hid"), void f()) : void alert("alertPop 需要唯一标示 ID，庸人这么多，牵错手了可不是闹着玩儿的！")
		}
		function b(a, b, c) {
			var c = "number" == typeof c && c > 3e3 ? c: 3e3,
			d = a.parent().parent().find(".error-label");
			d.html(b || "请重新输入").removeClass("hid"),
			clearTimeout(n.errorTimer),
			n.errorTimer = setTimeout(function() {
				d.addClass("hid").html("")
			},
			c)
		}
		function c() {
			i.addClass("hid"),
			i.remove()
		}
		function f() {
			var a = $("body").outerHeight(!0),
			b = j.outerHeight(),
			c = j.outerWidth(),
			d = window.scrollY,
			e = window.innerHeight,
			f = window.innerWidth;
			j.css({
				top: (e - b) / 2 + d,
				left: (f - c) / 2
			}),
			i.css({
				height: a > e ? a: e
			})
		}
		function g() {
			l.on("click", o.confirm),
			k.on("click", o.cancel)
		}
		var h,
		i,
		j,
		k,
		l,
		m,
		n = {},
		o = {
			cancel: function() {
				var a = $(this);
				if (!a.hasClass("isDisabled")) return c(),
				m.cancelBtn && m.cancelBtn.callback && m.cancelBtn.callback.call(this, i),
				!1
			},
			confirm: function() {
				var a = $(this);
				if (!a.hasClass("isDisabled")) return m.confirmBtn && m.confirmBtn.callback ? m.confirmBtn.callback.call(this, i) : c(),
				!1
			}
		};
		return {
			init: a,
			showError: b,
			close: c
		}
	}
	var d = require("tpl/ux/alertPop"),
	e = $(document.createDocumentFragment());
	b.exports = c
}),
define("tpl/ux/alertPop",
function(require, a, b) {
	require("core/tplFunc");
	b.exports = function(a) {
		var b = '<div id="' + a.wrapperId + '" class="alert-wrapper hid"><article class="wrapper">';
		if (a.title && (b += '<header class="title">' + a.title + "</header>"), b += " ", a.info && (b += '<span class="info">' + a.info + "</span>"), b += " ", a.label && (b += '<span class="label">' + a.label + "</span>"), b += " ", a.inputArr && a.inputArr.length) {
			b += " ";
			var c = a.inputArr;
			if (c) for (var d, e = -1, f = c.length - 1; f > e;) {
				if (d = c[e += 1], b += '<div class="input-wrapper"><div class="input-item">', "object" == typeof d && d.length) {
					b += " ";
					var g = d;
					if (g) for (var h, i = -1, j = g.length - 1; j > i;) h = g[i += 1],
					b += '<input id="' + (h.id || "") + '" name="' + (h.name || "") + '" type="text" placeholder="' + (h.placeholder || "") + '"/>';
					b += " "
				} else b += '<input id="' + (d.id || "") + '" name="' + (d.name || "") + '" type="text" placeholder="' + (d.placeholder || "") + '"/>';
				b += '</div><p class="error-label hid"></p></div>'
			}
			b += " "
		}
		return b += '<div class="action">',
		(a.cancelBtn || !a.cancelBtn && !a.confirmBtn) && (b += '<a id="' + (a.cancelBtn && a.cancelBtn.id || "J-alertPop-cancel") + '" href="javascript:void(0);" class="btn cancel-btn', a.cancelBtn && a.cancelBtn.isDisabled && (b += " isDisabled"), b += '">' + (a.cancelBtn && a.cancelBtn.txt || "取消") + "</a>"),
		b += " ",
		a.confirmBtn && (b += '<a id="' + (a.confirmBtn && a.confirmBtn.id || "J-alertPop-confirm") + '" href="javascript:void(0);" class="btn confirm-btn', a.confirmBtn && a.confirmBtn.isDisabled && (b += " isDisabled"), b += '">' + (a.confirmBtn && a.confirmBtn.txt || "确定") + "</a>"),
		b += "</div></article></div>"
	}
}),
define("act/link",
function(require, a) {
	var b = require("brick"),
	c = require("core/tplFunc").canAccessLink;
	a.events = {
		click: function(a, d) {
			if (a.stopPropagation(), !c) return b.notice.trigger("AccessDenied"),
			!1;
			var e = $(d),
			f = e.data("act-url");
			f && (location.href = f)
		}
	}
}),
define("core/tplFunc",
function(require, a) {
	var b = require("core/util/keepParams"),
	c = require("core/util/checkLogin"),
	d = require("core/util/accessLevel");
	a.canAccessLink = function() {
		return ! (!c && $render_data.common.showPopLogin && 2 == d)
	} (),
	a.href = function(d) {
		var e = d;
		return d && ("object" != typeof d || (e = d.urls && d.urls.h5 || d.scheme)) ? !c && $render_data.common.showPopLogin ? "javascript:require(['brick'],function(brick){brick.notice.trigger('AccessDenied');});": a.canAccessLink ? 0 === e.indexOf("javascript:") ? e: b(e) : "javascript:require(['brick'],function(brick){brick.notice.trigger('AccessDenied');});": "javascript:;"
	}
}),
define("core/util/keepParams",
function(require, a, b) {
	b.exports = function(a, b) {
		var c,
		d = $render_data.common;
		return a && d && (c = b ? d.ajaxPassParams: d.passParams, c && (a += -1 != a.indexOf("?") ? "&" + c: "?" + c)),
		a
	}
}),
define("core/util/checkLogin",
function(require, a, b) {
	b.exports = function() {
		return ! (1 != $render_data.common.isLogin && 1 != $render_data.common.login)
	} ()
}),
define("core/util/accessLevel",
function(require, a, b) {
	b.exports = $render_data.common.seeLevel || 0
}),
define("act/picShow",
function(require, a) {
	var b = require("jquery");
	a.events = {
		click: function(a, c) {
			var d = b(c),
			e = d.data("src") || d.attr("src");
			e = e.replace(/\/\w+\//, "/large/"),
			require(["ux/picShow"],
			function(a) {
				new a({
					imgList: e
				})
			})
		}
	}
}),
define("act/relation",
function(require, a) {
	function b(a, b) {
		var c = require("ux/relationPop");
		c.init(a, b, $(".module-cover").find(".item-main").find("span").text())
	}
	function c(a, c, d, f) {
		e({
			url: "/attentionDeal/" + a + "?",
			dataType: "json",
			type: "POST",
			data: "uid=" + c,
			success: function(a) {
				if (1 == a.ok) {
					2 > d ? (d += 2, b(f, c)) : d -= 3,
					console.log(d);
					var e = {
						type: "relation",
						sub_type: d,
						uid: c
					},
					g = require("tpl/mod/_cover_btn")(e);
					f.replaceWith(g)
				}
			},
			error: function() {
				alert("操作失败，请稍后再试")
			}
		})
	}
	var d = require("core/io/trans")(),
	e = d.json,
	f = require("brick"),
	g = require("core/tplFunc").canAccessLink,
	d = require("core/io/trans")(),
	e = d.json;
	a.events = {
		click: function(a, d, e) {
			if (!g) return f.notice.trigger("AccessDenied"),
			!1;
			var h = $(d),
			i = h.data("act-uid"),
			j = parseInt(e.sub_type, 10);
			if (2 == j || 3 == j) return b(h, i),
			!1;
			if (4 == j);
			else {
				var k = "addAttention",
				l = "";
				if ((5 == j || 6 == j) && (k = "delPrivate", l = "你确定要关注，不再消悄悄关注吗？"), "" !== l && !confirm(l)) return ! 1;
				c(k, i, j, h)
			}
		}
	}
}),
define("core/io/trans",
function(require, a, b) {
	var c = require("core/util/keepParams"),
	d = require("../../ux/alertPop"),
	d = require("../../ux/alertPop");
	b.exports = function() {
		var a = {},
		b = {};
		return b.set = function(b, c) {
			if ("undefined" != typeof a[b]) throw b + " 接口已经被定义！";
			a[b] = c
		},
		b.get = function(c, d) {
			if ("undefined" == typeof a[c]) throw c + " 接口没有定义！";
			var e = $.extend({},
			a[c], d);
			b.json(e)
		},
		b.json = function(a) {
			a.url = c(a.url, !0),
			a.type = a.type || "get",
			a.dataType = a.dataType || "json",
			a.timeout = a.timeout || 1e3 * ("get" == a.type ? 30: 60);
			var b = a.success;
			a.success = function(e) {
				var f = ((new Date).getTime(), "" + e.ok);
				switch (f) {
				case "-3":
					alert("请输入验证码");
					break;
				case "-7":
					window.location.href = "/security?from=0";
					break;
				case "-8":
					window.location.href = "/security";
					break;
				case "-9":
					"post" == a.type.toLowerCase() ? (alert("您的帐号存在风险，系统暂时锁定了部分功能，请通过手机验证以恢复正常。"), location.href = "/security/readonly") : b(e);
					break;
				case "-9+225":
				case "-9+222":
					"post" == a.type.toLowerCase() ? ($(".toast-wrapper").addClass("hid"), (new d).init({
						wrapperId: "J-" + (new Date).getTime(),
						info: "您的帐号存在风险，系统暂时锁定了部分功能，请通过手机验证以恢复正常。",
						confirmBtn: {
							callback: function() {
								window.location.href = "/security/stolenReadOnly"
							}
						}
					})) : b(e);
					break;
				case "-98":
				case "-100":
					location.href = c(e.url || "/login?backUrl=" + decodeURIComponent(location.href));
					break;
				case "-255":
					alert("您的帐号疑似被盗，已经被系统锁定部分功能，为了保障您的帐号安全，请立即修改密码。"),
					location.href = "/security";
					break;
				case "403":
					alert("您输入的网址疑似为不安全链接，无法发表，请谅解。\n如需帮助，请联系客服。");
					break;
				case "2014":
					location.href = data.location;
					break;
				case "20046":
					"post" == a.type.toLowerCase() ? ($(".toast-wrapper").addClass("hid"), (new d).init({
						wrapperId: "J-" + (new Date).getTime(),
						info: "您的登录邮箱尚未验证，不能使用完整功能，请验证邮箱。",
						cancelBtn: {},
						confirmBtn: {
							callback: function() {
								window.location.href = "/edmActive?disable_sinaurl=1"
							}
						}
					})) : b(e);
					break;
				case "ag:4_st:3":
					"post" == a.type.toLowerCase() ? ($(".toast-wrapper").addClass("hid"), (new d).init({
						wrapperId: "J-" + (new Date).getTime(),
						info: "你的邮箱未激活！激活邮箱，即可使用邮箱和密码登录微博，安全又方便。",
						cancelBtn: !0,
						confirmBtn: {
							txt: "立即激活",
							callback: function() {
								window.location.href = "https://passport.sina.cn/bindname/mail?entry=mweibo"
							}
						}
					})) : b(e);
					break;
				default:
					b(e)
				}
			},
			$.ajax(a)
		},
		b
	}
}),
define("core/util/keepParams",
function(require, a, b) {
	b.exports = function(a, b) {
		var c,
		d = $render_data.common;
		return a && d && (c = b ? d.ajaxPassParams: d.passParams, c && (a += -1 != a.indexOf("?") ? "&" + c: "?" + c)),
		a
	}
}),
define("ux/alertPop",
function(require, a, b) {
	function c() {
		function a(a) {
			return m = a || {},
			a.wrapperId ? $("#" + a.wrapperId).size() ? void alert(a.wrapperId + " ID 已经被占用啦！") : (h = d(m), e.append(h), $("body").append(e), i = $("#" + (m.wrapperId || "J-alertPop")), j = i.find(".wrapper"), k = i.find("#" + (m.cancelBtn && m.cancelBtn.id || "J-alertPop-cancel")), l = i.find("#" + (m.confirmBtn && m.confirmBtn.id || "J-alertPop-confirm")), g(), i.removeClass("hid"), void f()) : void alert("alertPop 需要唯一标示 ID，庸人这么多，牵错手了可不是闹着玩儿的！")
		}
		function b(a, b, c) {
			var c = "number" == typeof c && c > 3e3 ? c: 3e3,
			d = a.parent().parent().find(".error-label");
			d.html(b || "请重新输入").removeClass("hid"),
			clearTimeout(n.errorTimer),
			n.errorTimer = setTimeout(function() {
				d.addClass("hid").html("")
			},
			c)
		}
		function c() {
			i.addClass("hid"),
			i.remove()
		}
		function f() {
			var a = $("body").outerHeight(!0),
			b = j.outerHeight(),
			c = j.outerWidth(),
			d = window.scrollY,
			e = window.innerHeight,
			f = window.innerWidth;
			j.css({
				top: (e - b) / 2 + d,
				left: (f - c) / 2
			}),
			i.css({
				height: a > e ? a: e
			})
		}
		function g() {
			l.on("click", o.confirm),
			k.on("click", o.cancel)
		}
		var h,
		i,
		j,
		k,
		l,
		m,
		n = {},
		o = {
			cancel: function() {
				var a = $(this);
				if (!a.hasClass("isDisabled")) return c(),
				m.cancelBtn && m.cancelBtn.callback && m.cancelBtn.callback.call(this, i),
				!1
			},
			confirm: function() {
				var a = $(this);
				if (!a.hasClass("isDisabled")) return m.confirmBtn && m.confirmBtn.callback ? m.confirmBtn.callback.call(this, i) : c(),
				!1
			}
		};
		return {
			init: a,
			showError: b,
			close: c
		}
	}
	var d = require("tpl/ux/alertPop"),
	e = $(document.createDocumentFragment());
	b.exports = c
}),
define("tpl/ux/alertPop",
function(require, a, b) {
	require("core/tplFunc");
	b.exports = function(a) {
		var b = '<div id="' + a.wrapperId + '" class="alert-wrapper hid"><article class="wrapper">';
		if (a.title && (b += '<header class="title">' + a.title + "</header>"), b += " ", a.info && (b += '<span class="info">' + a.info + "</span>"), b += " ", a.label && (b += '<span class="label">' + a.label + "</span>"), b += " ", a.inputArr && a.inputArr.length) {
			b += " ";
			var c = a.inputArr;
			if (c) for (var d, e = -1, f = c.length - 1; f > e;) {
				if (d = c[e += 1], b += '<div class="input-wrapper"><div class="input-item">', "object" == typeof d && d.length) {
					b += " ";
					var g = d;
					if (g) for (var h, i = -1, j = g.length - 1; j > i;) h = g[i += 1],
					b += '<input id="' + (h.id || "") + '" name="' + (h.name || "") + '" type="text" placeholder="' + (h.placeholder || "") + '"/>';
					b += " "
				} else b += '<input id="' + (d.id || "") + '" name="' + (d.name || "") + '" type="text" placeholder="' + (d.placeholder || "") + '"/>';
				b += '</div><p class="error-label hid"></p></div>'
			}
			b += " "
		}
		return b += '<div class="action">',
		(a.cancelBtn || !a.cancelBtn && !a.confirmBtn) && (b += '<a id="' + (a.cancelBtn && a.cancelBtn.id || "J-alertPop-cancel") + '" href="javascript:void(0);" class="btn cancel-btn', a.cancelBtn && a.cancelBtn.isDisabled && (b += " isDisabled"), b += '">' + (a.cancelBtn && a.cancelBtn.txt || "取消") + "</a>"),
		b += " ",
		a.confirmBtn && (b += '<a id="' + (a.confirmBtn && a.confirmBtn.id || "J-alertPop-confirm") + '" href="javascript:void(0);" class="btn confirm-btn', a.confirmBtn && a.confirmBtn.isDisabled && (b += " isDisabled"), b += '">' + (a.confirmBtn && a.confirmBtn.txt || "确定") + "</a>"),
		b += "</div></article></div>"
	}
}),
define("core/tplFunc",
function(require, a) {
	var b = require("core/util/keepParams"),
	c = require("core/util/checkLogin"),
	d = require("core/util/accessLevel");
	a.canAccessLink = function() {
		return ! (!c && $render_data.common.showPopLogin && 2 == d)
	} (),
	a.href = function(d) {
		var e = d;
		return d && ("object" != typeof d || (e = d.urls && d.urls.h5 || d.scheme)) ? !c && $render_data.common.showPopLogin ? "javascript:require(['brick'],function(brick){brick.notice.trigger('AccessDenied');});": a.canAccessLink ? 0 === e.indexOf("javascript:") ? e: b(e) : "javascript:require(['brick'],function(brick){brick.notice.trigger('AccessDenied');});": "javascript:;"
	}
}),
define("core/util/checkLogin",
function(require, a, b) {
	b.exports = function() {
		return ! (1 != $render_data.common.isLogin && 1 != $render_data.common.login)
	} ()
}),
define("core/util/accessLevel",
function(require, a, b) {
	b.exports = $render_data.common.seeLevel || 0
}),
define("ux/relationPop",
function(require, a, b) {
	function c(a, b, c) {
		return t = b,
		u = c,
		void 0 === typeof t ? void console.error("莫得 uid，哪个知道你要找谁噻？！") : a ? (v.isInit || ($("body").append(n), o = $("#J-relationPop"), p = o.find("#J-scroll"), q = o.find("#J-list"), r = o.find("#J-action"), f(), g()), o.removeClass("hid"), v.isInit = !0, e(a), void $(document).bind("click", w.clickToClose)) : void console.error("没有 $target 的手谕，relationPop 是不会现身的!")
	}
	function d() {
		if (s) {
			try {
				s.destory()
			} catch(a) {
				console.log(a)
			}
			s = null
		}
		h()
	}
	function e(a) {
		var b = a.offset(),
		c = b.top + a.outerHeight() + 10,
		d = b.left + a.outerWidth() / 2 - o.outerWidth() / 2 - 60,
		e = window.innerWidth - o.outerWidth() - 5;
		d = d > 5 ? d > e ? e: d: 5,
		o.css({
			top: c,
			left: d
		})
	}
	function f() {
		i.get("getGroupList", {
			data: "uid=" + t,
			success: function(a) {
				if (1 == a.ok) {
					var b = '<a href="javascript:;" id="J-addGroup" class="add-btn">新建分组</a>';
					$.each(a.data,
					function(a, c) {
						b += '<a href="javascript:;" data-id="' + a + '"' + (c.isin ? 'class="checked"': "") + ">" + c.gname + "</a>"
					}),
					o.find(".loadingLarge").remove(),
					p.append(b),
					require(["core/lib/iscroll"],
					function(a) {
						s = new a("#J-list", {
							scrollbars: !0,
							resizenable: !1,
							preventDefaultException: {
								tagName: /^(SPAN|A|INPUT|TEXTAREA|BUTTON|SELECT|IMG)$/
							}
						})
					})
				}
			}
		})
	}
	function g() {
		p.on("click", "a", w.changeGroup),
		p.on("click", "#J-addGroup", w.createGroup),
		r.on("click", "[data-action=unfollow]", w.unfollow),
		r.on("click", "[data-action=close]", w.clickToClose)
	}
	function h() {
		p.off("click", "a", w.changeGroup)
	}
	var i = require("conf/inter/relationPop"),
	j = require("tpl/ux/relationPop")(),
	k = require("ux/alertPop"),
	l = new k,
	m = new k,
	n = $(document.createDocumentFragment());
	n.append(j);
	var o,
	p,
	q,
	r,
	s,
	t,
	u,
	v = {},
	w = {
		createGroup: function() {
			l.init({
				wrapperId: "J-createGroup-pop",
				title: "创建分组",
				inputArr: [{
					id: "J-group-name",
					placeholder: "分组名称最多8个汉字"
				}],
				confirmBtn: {
					callback: function(a) {
						var b = a.find("#J-group-name"),
						c = String.prototype.trim.call(b.val()),
						d = c.replace(/[\u4E00-\u9FA5]/g, "aa");
						return "" == c ? void l.showError(b, "分组名称不能为空，请重新输入") : d.length > 16 ? void l.showError(b, "分组名称不能超过16个字符或8个汉字") : /^[a-zA-z0-9]*$/.test(d) ? (l.close(), void i.get("createGroup", {
							data: "&uid=" + t + "&gname=" + encodeURIComponent(c),
							success: function(a) {
								var c = "";
								1 === a.ok ? ($.each(a.data,
								function(a, b) {
									c += '<a href="javascript:;" data-id="' + a + '" class="checked">' + b + "</a>"
								}), b.val(""), p.append(c), s.refresh(), s.scrollToElement("a:last-child", 100)) : alert(a.msg)
							}
						})) : void l.showError(b, "分组名称由数字、字母、中文组成")
					}
				}
			})
		},
		changeGroup: function() {
			var a = $(this);
			if (!a.hasClass("add-btn")) {
				var b = a.hasClass("checked") ? "removeUserFromGroup": "addUserToGroup";
				a.addClass("loading"),
				i.get(b, {
					data: "&gid=" + a.data("id") + "&uid=" + t,
					success: function(b) {
						var c = b.ok,
						d = b.msg;
						a.removeClass("loading"),
						1 == c ? a.toggleClass("checked") : alert(d)
					}
				})
			}
		},
		unfollow: function() {
			m.init({
				wrapperId: "J-" + (new Date).getTime(),
				info: "确定不再关注 " + (u ? u: "用户名") + " 了？",
				confirmBtn: {
					callback: function() {
						i.get("unfollow", {
							data: "&uid=" + t,
							success: function(a) {
								1 == a.ok ? location.reload() : alert(a.msg),
								m.close()
							}
						})
					}
				}
			})
		},
		clickToClose: function(a) {
			var b = $(a.target);
			if (b.length) {
				var c = "J-relationPop" === b.attr("id"),
				d = b.parents("#J-list").size() > 0,
				e = "show-relationPop" === b.data("node") || b.parents('[data-node="show-relationPop"]').size() > 0;
				if (!c && !d && !e) return o.addClass("hid"),
				void $(document).unbind("click", w.clickToClose)
			}
			return ! 1
		}
	};
	b.exports = {
		init: c,
		destory: d
	}
}),
define("conf/inter/relationPop",
function(require, a, b) {
	var c = require("core/io/trans")();
	c.set("getGroupList", {
		url: "/attGroups/getAttGroupListByUid"
	}),
	c.set("createGroup", {
		url: "/attGroupsDeal/createAndAddGroup",
		type: "post"
	}),
	c.set("addUserToGroup", {
		url: "/attGroupsDeal/addUserToGroup",
		type: "post"
	}),
	c.set("removeUserFromGroup", {
		url: "/attGroupsDeal/moveUserFromGroup",
		type: "post"
	}),
	c.set("unfollow", {
		url: "/attentionDeal/delAttention",
		type: "post"
	}),
	b.exports = c
}),
define("tpl/ux/relationPop",
function(require, a, b) {
	require("core/tplFunc");
	b.exports = function() {
		var a = '<div class="relation-wrapper" id="J-relationPop"><div class="list" id="J-list"><div id="J-scroll"><div class="loadingLarge"></div></div></div><div class="action" id="J-action"><p class="layout-box"><a href="javascript:;" class="box-col" data-action="unfollow">取消关注</a><a href="javascript:;" class="box-col" data-action="close-relationPop">确定</a></p></div></div>';
		return a
	}
}),
define("tpl/mod/_cover_btn",
function(require, a, b) {
	require("core/tplFunc");
	b.exports = function(a) {
		var b = '<button class="btn btn-normal" data-act-type="' + a.type + '" data-act-data="sub_type=' + a.sub_type + '&position=cover"';
		return a.scheme && (b += ' data-act-url="' + a.scheme + '"'),
		a.uid && (b += ' data-act-uid="' + a.uid + '"'),
		a.like_count && (b += ' data-act-like-count="' + a.like_count + '"'),
		b += ">",
		a.type && "like" === a.type ? (b += " ", b += a.sub_type && 1 === a.sub_type ? '<i class="iconimg iconimg-xs icon icon-likedsmall"></i>': '<i class="iconimg iconimg-xs icon icon-likesmall"></i>', b += "<span>" + (a.name || "赞一下") + "</span>") : a.type && "follow" === a.type ? (b += " ", b += a.sub_type && 1 === a.sub_type ? '<i class="iconf iconf_userinfo_tick"></i><span>已关注</span>': '<i class="iconf iconf_userinfo_plus"></i><span>关注</span>', b += " ") : a.type && "relation" === a.type ? (b += " ", b += a.sub_type && 2 === a.sub_type ? '<i class="iconf iconf_userinfo_tick txt-xl"></i><span>已关注</span><i class="icon-font icon-font-arrow-down txt-xs"></i>': a.sub_type && 3 === a.sub_type ? '<i class="iconf iconf_userinfo_arrow txt-xl"></i><span>相互关注</span><i class="icon-font icon-font-arrow-down txt-xs"></i>': a.sub_type && 1 === a.sub_type ? '<i class="iconf iconf_userinfo_tick txt-xl"></i><span>加关注</span><i class="icon-font icon-font-arrow-down txt-xs"></i>': '<i class="iconf iconf_userinfo_plus txt-xl"></i><span>加关注</span>', b += " ") : (b += " ", a.icon ? b += '<i class="iconf ' + a.icon + ' txt-xl"></i>': a.pic && (b += '<i class="iconimg iconimg-xs"><img src="' + a.pic + '"></i>'), b += "<span>" + a.name + "</span>"),
		b += "</button>"
	}
});