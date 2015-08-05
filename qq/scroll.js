define("component/scroll/scroll", ["gallery/iscroll/iscroll-probe.js"],
function(a, b) {
	b.init = function(b) {
		var c,
		d,
		e,
		f,
		g,
		h,
		i,
		j,
		k,
		l = a("gallery/iscroll/iscroll-probe.js"),
		m = 0;
		return d = {
			page: null,
			selector: "",
			refreshUrl: "",
			enableRefresh: !0,
			enableLoadmore: !0
		},
		e = $.extend(!0, {},
		d, b),
		g = $(e.selector),
		h = g.find(".j-loadmore"),
		i = g.find(".j-pullDown"),
		k = g.find(".j-pullDown-helper"),
		j = i.height(),
		f = parseInt(g.find(".j-hasData").val()),
		c = new l(e.selector, {
			click: !0,
			tap: !0,
			mouseWheel: !0,
			scrollbars: !0,
			probeType: 2
		}),
		e.enableRefresh || e.enableLoadmore ? (e.enableRefresh && c.on("scroll",
		function() {
			m || (this.y > j && !i.hasClass("flip") ? (i.addClass("flip"), i.text("释放立即刷新..."), this.minScrollY = j) : this.y < j && i.hasClass("flip") && (i.removeClass("flip"), i.text("下拉刷新..."), this.minScrollY = 0))
		}), c.on("scrollEnd",
		function() {
			e.enableLoadmore && f && this.y - 50 <= this.maxScrollY && 0 != this.y && setTimeout(function() {
				var a = "<li>新增内容</li><li>新增内容</li><li>新增内容</li><li>新增内容</li><li>新增内容</li>";
				g.find(".comm-list").append(a),
				c.refresh()
			},
			1e3),
			e.enableRefresh && i.hasClass("flip") && !m && (m = 1, i.addClass("pulldown-loading"), i.text("正在刷新..."), g.find(".j-refreshPanel").load(e.refreshUrl,
			function(a, b) {
				var d = "";
				d = "success" == b ? "刷新成功": "刷新失败，请重试",
				i.text(d),
				setTimeout(function() {
					this.minScrollY = 0,
					i.removeClass("pulldown-loading"),
					c.refresh(),
					m = 0
				},
				500)
			}))
		}), c) : void 0
	}
});