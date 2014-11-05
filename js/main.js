requirejs.config({
    baseUrl: 'js',
    paths: {
        soundmanager2: "./lib/soundmanager2-nodebug-2.97a-dev"
    }
});

require(['core/Engine'], function(Engine) {
    var engine = new Engine();
    engine.onReady(function() {
        engine.start();
    });
});
