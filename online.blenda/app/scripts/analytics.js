// Google Analytics
var ga = window['ga'] = null;
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-47046914-5', 'auto');
gaTrack('/');

function gaTrack(page) {
    if (ga && typeof ga === "function") {
        ga('set', 'page', page);
        ga('send', 'pageview');
    }
}

function gaForm(form) {
    if (ga && typeof ga === "function") {
        ga('sendform', form);
    }
}

// Yandex Metrika
(function(d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter28052760 = new Ya.Metrika({
                id: 28052760,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
            });
        } catch (e) {}
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function() {
            n.parentNode.insertBefore(s, n);
        };
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else {
        f();
    }
})(document, window, "yandex_metrika_callbacks");

function yaHit(page) {
    if (window.yaCounter28052760) {
        window.yaCounter28052760.hit(page);
    }
}

function yaGoal(form) {
    if (window.yaCounter28052760) {
        yaCounter28052760.reachGoal(form);
    }
}

// Jivosite
(function () {
    var widget_id = 'cmkNBgPmXP';
    var d = document;
    var w = window;

    function l() {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//code.jivosite.com/script/widget/' + widget_id;
        var ss = document.getElementsByTagName('script')[0];
        ss.parentNode.insertBefore(s, ss);
    }

    if (d.readyState == 'complete') {
        l();
    } else {
        if (w.attachEvent) {
            w.attachEvent('onload', l);
        } else {
            w.addEventListener('load', l, false);
        }
    }
})();
