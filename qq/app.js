define("js/app", ["gallery/mobilebone/mobilebone.js", "gallery/zepto/zepto-min.js", "gallery/underscore/1.6.0/underscore.js"], 
function(a) {
    Mobilebone = a("gallery/mobilebone/mobilebone.js"),
    $ = a("gallery/zepto/zepto-min.js"),
    _ = a("gallery/underscore/1.6.0/underscore.js"),
    Mobilebone.onpagefirstinto = function(b) {
        var c = b.id,
        d = "./module/" + c;
        a.async(d, 
        function(a) {
            a && a.init(b)
        })
    },
    Mobilebone.callback = function(a, b) {
        var c,
        d = document.querySelector("body > .header"),
        e = document.querySelector("body > .footer"),
        f = null,
        g = null,
        h = null,
        i = null;
        a && (f = e.querySelector("a[href$=" + a.id + "]"), h = a.querySelector(".header"), c = a.id, $(d).find("> div[data-link]").hide(), $(d).find("> div[data-link='" + c + "']").show(), b ? (g = e.querySelector("a[href$=" + b.id + "]"), i = b.querySelector(".header")) : null == h && (d.className = "header in", e.className = "footer in"), null == h ? (f && f.classList.add("active"), g && g.classList.remove("active"), null != i && (d.className = "header slide reverse in", e.className = "footer slide reverse in")) : b && null == i && (d.className = "header slide out", e.className = "footer slide out"))
    },
    Mobilebone.init()
});