$('document').ready(function() {
	if (getCookie('qtpopup') == '') {}
	ga('send', 'event', 'wx', 'wx_player_page_radio');
	ga('send', 'event', 'wx', 'wx_player_page');
	_hmt.push(['_trackEvent', 'wx', 'wx_player_page_radio']);
	_hmt.push(['_trackEvent', 'wx', 'wx_player_page']);
	userAgent = navigator.userAgent.toLowerCase();
	isAndroid = (userAgent.indexOf("Android") > -1 || userAgent.indexOf("android") > -1);
	isiPad = userAgent.indexOf("ipad") >= 0;
	isiPhone = (navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1);
	isWeixin = userAgent.indexOf("micromessenger") >= 0;
	first_play = false;
	played_time = null;
	timeupdate_time = null;
	var logger = $("#logger");
	var writeToLogger = function(text) {};
	if (window.location.href.indexOf('_from=3') != -1) {
		ga('send', 'event', 'wx', 'wx_player_page_wb');
		_hmt.push(['_trackEvent', 'wx', 'wx_player_page_wb']);
	} else {
		if (userAgent.indexOf("weibo") > 0) {
			ga('send', 'event', 'wx', 'wx_player_page_wb');
			_hmt.push(['_trackEvent', 'wx', 'wx_player_page_wb']);
		}
	}
	if (window.location.href.indexOf('_from=4') != -1) {
		ga('send', 'event', 'wx', 'wx_player_page_tqq');
		_hmt.push(['_trackEvent', 'wx', 'wx_player_page_tqq']);
	} else {
		if (userAgent.indexOf("txmicroblog") > 0) {
			ga('send', 'event', 'wx', 'wx_player_page_tqq');
			_hmt.push(['_trackEvent', 'wx', 'wx_player_page_tqq']);
		}
	}
	if (window.location.href.indexOf('_from=100') != -1) {
		ga('send', 'event', 'wx', 'wx_player_page_qqqun');
		_hmt.push(['_trackEvent', 'wx', 'wx_player_page_qqqun']);
	}
	if (window.location.href.indexOf('_from=101') != -1) {
		ga('send', 'event', 'wx', 'wx_player_page_tieba');
		_hmt.push(['_trackEvent', 'wx', 'wx_player_page_tieba']);
	}
	$(window).bind('beforeunload',
	function() {
		if (playing) {
			return '离开页面将停止正在播放的内容'
		}
	});
	function changeStat(stat) {
		$('.cover_pic').removeClass('load');
		$('.cover_pic').removeClass('play');
		$('.cover_pic').removeClass('stop');
		$('.cover_pic').addClass(stat);
	}
	function addEvent(eventName, target, handler) {
		if (!target.addEventListener) {
			target.attachEvent(eventName, handler);
		} else {
			target.addEventListener(eventName, handler, false);
		}
	}
	function toHHMMSS(sec_num) {
		sec_num = Math.floor(sec_num);
		var hours = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);
		if (hours < 10) {
			hours = "0" + hours;
		}
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		var time = hours + ':' + minutes + ':' + seconds;
		return time;
	}
	function toHHMMSS2(hours, minutes, seconds) {
		if (hours < 10) {
			hours = "0" + hours;
		}
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		var time = hours + ':' + minutes + ':' + seconds;
		return time;
	}
	if (isWeixin) {
		$('#share-btn').click(function() {
			ga('send', 'event', 'wx', 'wx_want_share');
			_hmt.push(['_trackEvent', 'wx', 'wx_want_share']);
			$('.promp').toggle();
		});
	} else {
		$('#share-btn').hide();
	}
	$('.promp').click(function() {
		$('.promp').hide();
	});
	qtplayer = new Audio();
	playing = false;
	lp = null;
	function living_program() {
		$('.live-program').each(function() {
			now = moment();
			start = moment($(this).attr('start'), "YYYYMMDD_HHmmss");
			end = moment($(this).attr('start'), "YYYYMMDD_HHmmss").add('seconds', parseInt($(this).attr('duration')));
			if ($(this).attr('date') == 'today') {
				if (now.isBefore(start)) {
					$(this).removeClass('replay-program');
					$(this).removeClass('now-program');
					$(this).addClass('future-program');
				} else if (now.isAfter(start) && now.isBefore(end)) {
					$(this).removeClass('replay-program');
					$(this).removeClass('future-program');
					$(this).addClass('now-program');
					$('#page-live-program-name').text($('.now-program').find('#program-name').text());
					$('#page-live-broadcaster').text($('.now-program').find('#broadcaster').text());
					if (lp == null) {
						lp = start;
					}
					if (!start.isSame(lp)) {
						lp = start;
						if (isiPad || isiPhone) {
							qtplayer.src = 'http://hls.gz.qingting.fm' + $('.now-program').attr('hls');
							qtplayer.play();
						} else {
							qtplayer.src = 'http://http.hz.qingting.fm' + $('.now-program').attr('stream');
							qtplayer.play();
						}
					}
				} else {
					$(this).removeClass('future-program');
					$(this).removeClass('now-program');
					$(this).addClass('replay-program');
				}
			} else {
				$(this).addClass('replay-program');
			}
		});
	}
	living_program();
	addEvent('timeupdate', qtplayer,
	function() {
		console.log('timeupdate');
		writeToLogger('timeupdate');
		timeupdate_time = new Date().getTime();
		d = qtplayer.duration;
		c = qtplayer.currentTime;
		if (qtplayer.duration == Infinity || qtplayer.duration == 0) {
			var today = new Date();
			if (today.getSeconds() == 0) {
				living_program();
			}
			$('#page-live-time').text(toHHMMSS2(today.getHours(), today.getMinutes(), today.getSeconds()));
		}
	});
	addEvent('durationchange', qtplayer,
	function() {
		console.log('durationchange');
		writeToLogger('durationchange');
		if (isAndroid) {
			if (!playing) {
				changeStat('stop');
			}
		}
	});
	addEvent('waiting', qtplayer,
	function() {
		console.log('waiting');
		writeToLogger('waiting');
		playing = false;
		changeStat('load');
	});
	addEvent('pause', qtplayer,
	function() {
		console.log('pause');
		writeToLogger('pause');
		playing = false;
		changeStat('stop');
	});
	addEvent('playing', qtplayer,
	function() {
		console.log('playing');
		writeToLogger('playing');
		playing = true;
		changeStat('play');
	});
	addEvent('play', qtplayer,
	function() {
		console.log('play');
		writeToLogger('play');
		playing = true;
		changeStat('play');
	});
	addEvent('ended', qtplayer,
	function() {
		console.log('ended');
		writeToLogger('ended');
		playing = false;
		changeStat('stop');
	});
	addEvent('error', qtplayer,
	function() {
		console.log('error');
		writeToLogger('error');
		playing = false;
		qtplayer.play();
	});
	var ios_src = "",
	android_src = "";
	var stream = $('.now-program').attr('hls');
	if (stream == undefined) {
		stream = "/live/270.m3u8";
	}
	ios_src = 'http://hls.gz.qingting.fm' + stream;
	stream = $('.now-program').attr('stream');
	if (stream == undefined) {
		stream = "/270.mp3";
	}
	android_src = 'http://http.hz.qingting.fm' + stream;
	if (isiPad || isiPhone) {
		qtplayer.src = ios_src;
	} else {
		var tryurl = ios_src + "?format=mpegts";
		qtplayer.src = tryurl;
		retry_src = function(evt) {
			console.log(evt);
			writeToLogger("retry error");
			qtplayer.src = android_src;
			qtplayer.load();
			qtplayer.play();
			qtplayer.removeEventListener("error", retry_src);
		}
		var check_interval = setInterval(function() {
			console.log("interval");
			if ((!timeupdate_time && new Date().getTime() - played_time >= 5 * 1000) || (timeupdate_time && new Date().getTime() - played_time >= 5 * 1000 && timeupdate_time - played_time < 5 * 1000)) {
				console.log("internal error");
				writeToLogger("interval error");
				console.log(android_src);
				qtplayer.src = android_src;
				qtplayer.load();
				qtplayer.play();
				clearInterval(check_interval);
			}
		},
		3500);
		addEvent("error", qtplayer, retry_src);
	}
	if (isiPad || isiPhone) {
		changeStat('stop');
	} else {
		qtplayer.load();
		changeStat('load');
		qtplayer.play();
		played_time = new Date().getTime()
		 if (!isAndroid) {
			ga('send', 'event', 'wx', 'wx_play');
			_hmt.push(['_trackEvent', 'wx', 'wx_play']);
			qtplayer.play();
		}
	}
	playControlClick = function() {
		if (playing) {
			ga('send', 'event', 'wx', 'wx_pause');
			_hmt.push(['_trackEvent', 'wx', 'wx_pause']);
			qtplayer.pause();
			$('.popup').toggle();
		} else {
			played_time = new Date().getTime()
			 ga('send', 'event', 'wx', 'wx_play');
			_hmt.push(['_trackEvent', 'wx', 'wx_play']);
			qtplayer.play();
			if (isiPad || isiPhone) {
				changeStat('load');
			}
		}
	}
	$('#popup-close').click(function() {
		$('.popup').toggle();
	});
	$('#btn-play').click(playControlClick);
	$('#quick-list').click(function() {
		$('.page-live').toggle();
		$('.page-programs').toggle();
		$('.top-bar').toggle();
		if ($('.page-live').css('display') == 'none') {
			$('#quick-list').find('h5').text('返回');
		} else {
			$('#quick-list').find('h5').text('查看节目单');
		}
	});
	WB2.anyWhere(function(W) {
		_t = '我正在使用 @蜻蜓FM 收听上海人民广播电台 ' + $('.now-program').find('#broadcaster').text().trim() + ' 主持的 ' + $('.now-program').find('#program-name').text().trim() + '， 快来一起听吧! ' + window.location.href;
		W.widget.publish({
			'id': 'quick-share',
			'default_text': _t,
			'uid': 'qingtingfm',
			'refer': 'y',
			'action': 'publish'
		});
	});
	$('.download-bar-btn').click(function() {
		ga('send', 'event', 'wx', 'wx_download');
		_hmt.push(['_trackEvent', 'wx', 'wx_download']);
		if (window.location.href.indexOf('_from=3') != -1) {
			ga('send', 'event', 'wx', 'wx_download_wb');
			_hmt.push(['_trackEvent', 'wx', 'wx_download_wb']);
		} else {
			if (userAgent.indexOf("weibo") > 0) {
				ga('send', 'event', 'wx', 'wx_download_wb');
				_hmt.push(['_trackEvent', 'wx', 'wx_download_wb']);
			}
		}
		if (window.location.href.indexOf('_from=4') != -1) {
			ga('send', 'event', 'wx', 'wx_download_tqq');
			_hmt.push(['_trackEvent', 'wx', 'wx_download_tqq']);
		} else {
			if (userAgent.indexOf("txmicroblog") > 0) {
				ga('send', 'event', 'wx', 'wx_download_tqq');
				_hmt.push(['_trackEvent', 'wx', 'wx_download_tqq']);
			}
		}
		if (window.location.href.indexOf('_from=100') != -1) {
			ga('send', 'event', 'wx', 'wx_download_qqqun');
			_hmt.push(['_trackEvent', 'wx', 'wx_download_qqqun']);
		}
		if (window.location.href.indexOf('_from=101') != -1) {
			ga('send', 'event', 'wx', 'wx_download_tieba');
			_hmt.push(['_trackEvent', 'wx', 'wx_download_tieba']);
		}
		if (window.location.href.indexOf('zx.m.qingting.fm') != -1) {
			ga('send', 'event', 'wx', 'wx_download_zhongxing');
			_hmt.push(['_trackEvent', 'wx', 'wx_download_zhongxing']);
		}
		pid = $(this).attr('pid').trim();
		if (pid) {
			ga('send', 'event', 'wx', 'wx_download_channel', 'download_' + pid);
			_hmt.push(['_trackEvent', 'wx', 'wx_download_channel', 'download_' + pid]);
		}
	});
});
function htmlDecode(str) {
	return str.replace(/&#39;/g, '\'').replace(/<br\s*(\/)?\s*>/g, '\n').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
}
function tagShare(str) {
	if (str.indexOf('#playing') != -1) {
		str = str.replace('#playing', '');
	}
	return str;
}
function onBridgeReady() {
	iu = 'http://qingting-pic.b0.upaiyun.com/2014/0909/20140909020920357.jpg'
	_t = '我正在收听上海人民广播电台 ' + $('.now-program').find('#broadcaster').text().trim() + ' 主持的 ' + $('.now-program').find('#program-name').text().trim() + '， 快来一起听吧';
	var appId = '',
	imgUrl = iu,
	link = tagShare(window.location.href),
	title = htmlDecode(_t),
	desc = htmlDecode('上海人民广播电台，中国最具实力的新闻广播频率之一，“影响中国十大广播电台”，以全球视野、表达上海观点。新闻热线021—62706270。'),
	fakeid = "";
	desc = desc || link;
	WeixinJSBridge.on('menu:share:appmessage',
	function(argv) {
		WeixinJSBridge.invoke('sendAppMessage', {
			"appid": appId,
			"img_url": imgUrl,
			"img_width": "640",
			"img_height": "640",
			"link": link,
			"desc": desc,
			"title": title
		},
		function(res) {});
		$.get('/trace/share_friend?' + $.param({
			"u": escape(window.location.href)
		}))
	});
	WeixinJSBridge.on('menu:share:timeline',
	function(argv) {
		WeixinJSBridge.invoke('shareTimeline', {
			"img_url": imgUrl,
			"img_width": "640",
			"img_height": "640",
			"link": link,
			"desc": desc,
			"title": title
		},
		function(res) {});
		$.get('/trace/share_pyq?' + $.param({
			"u": escape(window.location.href)
		}))
	});
	WeixinJSBridge.on('menu:general:share',
	function(argv) {
		var scene = 0;
		switch (argv.shareTo) {
		case 'friend':
			scene = 1;
			break;
		case 'timeline':
			scene = 2;
			break;
		case 'weibo':
			scene = 3;
			break;
		}
		argv.generalShare({
			"appid": appId,
			"img_url": imgUrl,
			"img_width": "640",
			"img_height": "640",
			"link": link,
			"desc": desc,
			"title": title
		},
		function(res) {});
	});
}
if (typeof WeixinJSBridge == "undefined") {
	if (document.addEventListener) {
		document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	} else if (document.attachEvent) {
		document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
		document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	}
} else {
	onBridgeReady();
}