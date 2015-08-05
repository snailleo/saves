define(function(require,exports,module){
	var $ = require("jquery");
	var t = $("h1").text();
	console.log(t);
	function m1(){
		this.can = "属性";
		console.log(this.can);
	}
	exports.m1 = function(){
		return m1();
	}
})