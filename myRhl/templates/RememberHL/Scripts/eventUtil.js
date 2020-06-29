var eventUtil = {
    touchClick: function (obj, fun) {
        var start_x = 0,
            start_y = 0;
        obj.addEventListener('touchstart', function (e) {
            start_x = e.touches[0].clientX;
            start_y = e.touches[0].clientY;
            document.addEventListener('touchend', touEnd, false);
        });
        function touEnd(e) {
            var endX = e.changedTouches[0].clientX;
            var endY = e.changedTouches[0].clientY;
            if (Math.abs(endX - start_x) < 5 && Math.abs(endY - start_y) < 5) {
                fun.call(obj, e);
            }
            document.removeEventListener('touchend', touEnd, false);
        };
    },
    // 添加句柄
    addHandler: function addEvent(obj, type, handle) {
        if (!obj || !type || !handle) {
            return;
        }
        if (obj instanceof Array) {
            for (var i = 0, l = obj.length; i < l; i++) {
                addEvent(obj[i], type, handle);
            }
            return;
        }
        if (type instanceof Array) {
            for (var i = 0, l = type.length; i < l; i++) {
                addEvent(obj, type[i], handle);
            }
            return;
        }
        window.__allHandlers = window.__allHandlers || {};
        window.__Hcounter = window.__Hcounter || 1;
        function setHandler(obj, type, handler, wrapper) {
            obj.__hids = obj.__hids || [];
            var hid = 'h' + window.__Hcounter++;
            obj.__hids.push(hid);
            window.__allHandlers[hid] = {
                type: type,
                handler: handler,
                wrapper: wrapper
            }
        }
        function createDelegate(handle, context) {
            return function () {
                return handle.apply(context, arguments);
            };
        }
        if (window.addEventListener) {
            var wrapper = createDelegate(handle, obj);
            setHandler(obj, type, handle, wrapper)
            obj.addEventListener(type, wrapper, false);
        }
        else if (window.attachEvent) {
            var wrapper = createDelegate(handle, obj);
            setHandler(obj, type, handle, wrapper)
            obj.attachEvent("on" + type, wrapper);
        }
        else {
            obj["on" + type] = handle;
        }
    },
    // 删除句柄
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getType: function (event) {
        return event.type;
    },
    getElement: function (event) {
        return event.target || event.srcElement;
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
}