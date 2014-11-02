requirejs.config({
    baseUrl: 'js',
    paths: {
        soundmanager2: "./lib/soundmanager2-nodebug-2.97a-dev"
    }
});

require(['core/Engine'], function(Engine) {
    console.log("Starting Frogger game");
    new Engine().start();
});
