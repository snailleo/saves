/**
 * 获得base64
 * @param {Object} obj
 * @param {Number} [obj.width] 图片需要压缩的宽度，高度会跟随调整
 * @param {Number} [obj.quality=0.8] 压缩质量，不压缩为1
 * @param {Function} [obj.before(this, blob, file)] 处理前函数,this指向的是input:file,返回false则阻断后续执行
 * @param {Function} obj.success(obj) 处理后函数
 * @example
 *
 */
$.fn.localResizeIMG = function(obj) {
    this.on('change', function() {
        var file = this.files[0];
        var URL = window.URL || window.webkitURL;
        var blob = URL.createObjectURL(file);
        // 执行前函数
        if ($.isFunction(obj.before)) {
        	var re = obj.before(this, blob, file);
            if (re != undefined && !re) {
            	return;
            }
        };

        _create(blob, file);
        this.value = ''; // 清空临时数据
    });
    
    /**
     * 获得图片的缩放尺寸
     * @param img
     * @returns {{w: (Number), h: (Number)}}
     */
    function _resize(img, width) {
    	var w = width;
    	var ret = {w: img.width, h: img.height};
    	if (img.width > width) {
    		var scale = img.width / img.height;
        	var h = w / scale;
        	if (w & h) {
        		ret.w = w;
        		ret.h = h;
        	} else if (w) {
        		ret.w = w;
        		ret.h = Math.ceil(w / scale);
        	} else if (h) {
        		ret.w = Math.ceil(h * scale);
        		ret.h = h;
        	}
    	}	
        return ret;
    }

    /**
     * 生成base64
     * @param blob 通过file获得的二进制
     */
    function _create(blob, file) {
        var img = new Image();
        img.src = blob;
        img.onload = function() {
        	var resize = _resize(img, obj.width);
        	// 创建canvas
            var canvas = document.createElement('canvas'), ctx;
            canvas.width = resize.w;
            canvas.height = resize.h;
            ctx = canvas.getContext('2d');
            if (navigator.userAgent.match(/iphone/i)) {
                var mpImg = new MegaPixImage(img);
                mpImg.render(canvas, {
                    maxWidth: resize.w,
                    maxHeight: resize.h,
                    quality: obj.quality || 0.8
                });
            }
            /**
             * 生成base64
             * 兼容修复移动设备需要引入mobileBUGFix.js
             */
            var base64;
            
                //调整正确的拍摄方向
                EXIF.getData(img, function () {
                	var orientationEXIF = (EXIF.pretty(this)).match(/Orientation : (\d)/), orientation = orientationEXIF ? + orientationEXIF[1] : 1;
                	switch (orientation) {
                		case 3:
                			ctx.rotate(180 * Math.PI / 180);
                			ctx.drawImage(img, -resize.w, -resize.h, resize.w, resize.h);
                			break;

                		case 6:alert("3")
                			canvas.width = resize.h;
                            canvas.height = resize.w;
                			ctx.rotate(90 * Math.PI / 180);
                			ctx.drawImage(img, 0, -resize.h, resize.w, resize.h);
                			break;

                		case 8:
                			canvas.width = resize.h;
                            canvas.height = resize.w;
                			ctx.rotate(270 * Math.PI / 180);
                			ctx.drawImage(img, -resize.w, 0, resize.w, resize.h);
                			break;

                		default :alert("default")
                			ctx.drawImage(img, 0, 0, resize.w, resize.h);
                			break;
                	}
                	// 修复IOS
                    if (navigator.userAgent.match(/Android/i)) { // 修复android
                    	var encoder = new JPEGEncoder();
                    	base64 = encoder.encode(ctx.getImageData(0, 0, resize.w, resize.h), obj.quality * 100 || 80);
                    } else { //PC端浏览器
                    	base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.8);
                    }
                    // 生成结果
                    var result = {
                    	base64: base64,
                    	clearBase64: base64.substr(base64.indexOf(',') + 1)
                    };
                    
                    // 执行后函数
                    obj.success(result);
                });
        };
    }
    
};


//DEMO
/*
//上传
$('input:file').localResizeIMG({
	width: 100, //宽度
	quality: 0.1, //质量压缩比 0.1代表原图的10%
	//before: function (that, blob) {},
	success: function (result) {
		$("#img1").attr("src", result.base64); //本地压缩后的图片回显
		//如果需要缩略图的话就给smallWidth参数，不需要则不给
		$.post('/upload.do',{pic : result.base64.substr(23), smallWidth:100 }, function(data){
			$("#img1").attr("src", data.img); //原图服务端地址
			$("#img2").attr("src", data.smallImg); //缩略图服务端地址
            $("#img1").attr("t", data.ticket); //删除图片票据
            $("#img2").attr("t", data.smallTicket);
		}, "json");
	}
});
//删除
$.post('/upload!delete.do',{pic : $("#img1").attr("src"), smallPic:$("#img2").attr("src"), ticket : $("#img1").attr("t"), smallTicket:$("#img2").attr("t") }, function(result){
	if (result) {
		alert("删除成功");
	} else {
		alert("删除失败");
	}
}, "json");
*/