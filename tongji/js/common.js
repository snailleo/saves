//by 2014.9.18

$(function(){
	var drop = $("#drop_down");
	$(".pro_xiala").on("click",function(e){
		var t = $(this).find("em");
		if(t.hasClass("on")  ){
			t.removeClass("on");
			drop.removeClass("act");
		}else{
			t.addClass("on");
			drop.addClass("act");
		}
		e.preventDefault();
		e.stopPropagation();
	});
	$("body").on("click",function(){
		$(".pro_xiala em").removeClass("on");
		drop.removeClass("act");	
	});
})
	

;(function(){
	function SX(){
		
		this.oWidth = window.innerWidth;

		
		this.dot = [];
		this.oSearch = document.querySelector(".scroll_wrap2");
		this.oLi = this.oSearch.getElementsByTagName("li");	
	}

	SX.prototype = {
	init : function(){
		this.setW();
		this.idx = 0;
		this.rendDot();
		this.bindSearch();
	},
	
	setW : function(){
		var _t = this,w = this.oWidth;
		
		
		_t.oSearch.style.width = (w * _t.oLi.length) + "px";
		for(i=0;i<_t.oLi.length;i++){
			_t.oLi[i].style.width = w + "px";	
		}
	},

	
	
	rendDot : function(){
		var dul = document.getElementById("scroll_position2");
		var len = this.oLi.length;
		for(i=0;i<len;i++){
			this.dot[i] = document.createElement("li");
			this.dot[i].innerHTML = "<a href='javascript:;'></a>";
			if(i==0){this.dot[i].className = "on";}
			dul.appendChild(this.dot[i]);
		}
	},
	
	goIndex : function(){
		var idx = this.idx;
		var d = this.dot;
		var len = d.length;
	},
	
	bindSearch : function(){
		var t = this;
		var wrap = document.getElementById("scroll_img2");
		
		function s(e){
			e.preventDefault();

			t.startTime = new Date() * 1;
			t.startX = e.touches[0].pageX;

			t.offsetX = 0;

			var target = e.target;
			while(target.nodeName != 'LI' && target.nodeName != 'BODY'){
				target = target.parentNode;
			}
			t.target = target;
		}
		
		function m(e){
			e.preventDefault();
				t.offsetX = e.targetTouches[0].pageX - t.startX;

				var i = t.idx - 1;

				var m = i + 3;
				
				t.oSearch.style.webkitTransition = '-webkit-transform 0s ease-out';
				t.oSearch.style.webkitTransform = 'translate3d('+ (-t.idx*t.oWidth+ t.offsetX )+'px, 0, 0)';
		}
		
		function e(e){
			e.preventDefault();
				var boundary = t.oWidth/6;
				var endTime = new Date() * 1;

				if(endTime - t.startTime > 300){
					if(t.offsetX >= boundary){
						slide('-1');
					}else if(t.offsetX < 0 && t.offsetX < -boundary){
						slide('+1');
					}else{
						slide('0');
					}
				}else{
					//优化
					if(t.offsetX > 50){
						slide('-1');
					}else if(t.offsetX < -50){
						slide('+1');
					}else{
						slide('0');
					}
				}
		}
		
		function slide(num){
			var n = t.idx + parseInt(num);
			t.idx = n < 0 ? 0 : (n > (t.oLi.length - 1) ? t.oLi.length - 1:n );
			if(t.idx >= 0 && t.idx < t.oLi.length){
				t.oSearch.style.webkitTransition = '-webkit-transform 0.2s ease-out';
				t.oSearch.style.webkitTransform = 'translate3d('+  (-t.idx*t.oWidth) +'px, 0, 0)';
				//console.log(t.dot)
				for(i=0;i<t.oLi.length;i++){	
					if(i==(t.idx)){t.dot[i].className = "on";}
					else{
						t.dot[i].className = "";	
					}
				}
			}
		}
		
		wrap.addEventListener("touchstart",s,false);
		wrap.addEventListener("touchmove",m,false);
		wrap.addEventListener("touchend",e,false);
	}
	
	}

	var obj = new SX();
	obj.init();
})()
