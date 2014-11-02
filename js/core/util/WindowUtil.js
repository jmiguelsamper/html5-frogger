define(function(){

    function WindowUtil() {
    }

    WindowUtil.prototype = {
        width: function () {
            return window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth
                || 800;
        },

        height: function () {
            return window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight
                || 600;
        }
        
    };

    return WindowUtil;
});
