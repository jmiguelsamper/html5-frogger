define([], function () {

    function Resources() {
        this.resourceCache = {};
        this.readyCallbacks = [];
    }

    Resources.prototype = {
        // Load an image url or an array of image urls
        load: function(urlOrArr) {
            if (urlOrArr instanceof Array) {
                var ref = this;
                urlOrArr.forEach(function (url) {
                    ref.loadUrl(url);
                });
            } else {
                this.loadUrl(urlOrArr);
            }
        },

        loadUrl: function(url) {
            if (this.resourceCache[url]) {
                return this.resourceCache[url];
            } else {
                var img = new Image();
                var ref = this;
                img.onload = function () {
                    ref.resourceCache[url] = img;
                    if (ref.isReady()) {
                        ref.readyCallbacks.forEach(function(func) {
                            func();
                        });
                    }
                };
                this.resourceCache[url] = false;
                img.src = url;
            }
        },
        
        get: function (url) {
            return this.resourceCache[url];
        },
        
        isReady: function () {
            var ready = true;
            for (var k in this.resourceCache) {
                if (this.resourceCache.hasOwnProperty(k) &&
                        !this.resourceCache[k]) {
                    ready = false;
                }
            }
            return ready;
        },
        
        onReady: function(func) {
            this.readyCallbacks.push(func);
        }
    };

    return Resources;
});
