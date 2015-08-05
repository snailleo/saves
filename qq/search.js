define("component/search/search", [], 
function(a, b) {
    b.init = function(a) {
        var b = $(a),
        c = $("#j-searchMask"),
        d = b.find(".header");
        d.length || (d = $(".header")),
        c.height($(window).height() - 48),
        b.find(".j-showSearch").click(function() {
            return b.find(".j-pullDown").hide(),
            d.addClass("con-search-transition outY"),
            $(this).parents(".content").addClass("top0"),
            $(this).parents(".con-search").addClass("show").find(".j-conSearchIpt").focus(),
            setTimeout(function() {
                c.removeClass("result").fadeIn(100)
            },
            200),
            !1
        });
        var e = function() {
            return b.find(".j-pullDown").show(),
            d.removeClass("outY"),
            b.find(".content").removeClass("top0").find(".con-search").removeClass("show").find(".j-conSearchIpt").val(""),
            c.hide().find(".j-noResult").hide(),
            !1
        };
        b.find(".j-hideSearch").click(e),
        c.click(e),
        b.find(".j-clearTxt").click(function() {
            $(this).hide().siblings(".j-conSearchIpt").val("").focus().change()
        }),
        b.find(".j-conSearchIpt").on("change keyup", 
        function() {
            var a = $(this),
            b = a.val();
            "" != b ? (a.siblings(".j-clearTxt").show(), c.addClass("result").find(".j-noResult").show()) : (a.siblings(".j-clearTxt").hide(), c.removeClass("result").find(".j-noResult").hide())
        }),
        c.find(".j-noResult").click(function() {
            return ! 1
        })
    }
});