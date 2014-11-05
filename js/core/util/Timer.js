define(function(){

    function Timer() {
        this.lastTime = Date.now();
    }

    Timer.prototype = {
        nextDelta: function () {
            var now = Date.now();
            var dt = (now - this.lastTime) / 1000.0;
            this.lastTime = now;
            return dt;
        }
    };

    return Timer;
});
