/**
 * @author yux1ang@outlook.com
 * @version 0.0.1
 */
var su = {
    documentHeight: function () {
        var body = document.body;
        var documentElement = document.documentElement;

        return Math.max(
                body.scrollHeight,
                body.offsetHeight,
                body.clientHeight,
                documentElement.scrollHeight,
                documentElement.offsetHeight,
                documentElement.clientHeight
            );
    },
    documentWidth: function () {
        var body = document.body;
        var documentElement = document.documentElement;

        return Math.max(
                body.scrollWidth,
                body.offsetWidth,
                body.clientWidth,
                documentElement.scrollWidth,
                documentElement.offsetWidth,
                documentElement.clientWidth
            );
    },
    viewportHeight: function () {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    },
    viewportWidth: function () {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    },
    elementHeight: function (elm) {
        return Math.max(
                elm.scrollHeight,
                elm.offsetHeight,
                elm.clientHeight
            );
    },
    elementWidth: function (elm) {
        return Math.max(
                    elm.scrollWidth,
                    elm.offsetWidth,
                    elm.clientWidth
                );
    }
};
