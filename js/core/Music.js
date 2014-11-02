define(['soundmanager2'], function(soundManager) {

    function Music() {
    }

    Music.prototype = {
        start: function () {
            soundManager.setup({
                url: 'swf',
                preferFlash: false,
                debugMode: false,
                onready: function () {
                    soundManager.createSound({
                        id: 'backgroundMusic',
                        // Music from https://archive.org/details/iiiMicrocompoFamiboy80s - licence CC-by-nc-sa
                        url: 'https://archive.org/download/iiiMicrocompoFamiboy80s/03_morgothic_-_true_epic.ogg',
                        autoLoad: true,
                        autoPlay: true,
                        loops: 100,
                        onload: function() {
                            soundManager.play('backgroundMusic');
                        },
                        volume: 20
                    });
                    soundManager.createSound({
                        id: 'hop',
                        url: 'sound/hop.ogg',
                        autoLoad: true,
                        loops: 1,
                        volume: 50
                    });
                    soundManager.createSound({
                        id: 'next',
                        url: 'sound/next.ogg',
                        autoLoad: true,
                        loops: 1,
                        volume: 50
                    });
                    soundManager.createSound({
                        id: 'fail',
                        url: 'sound/fail.ogg',
                        autoLoad: true,
                        loops: 1,
                        volume: 50
                    });
                    soundManager.createSound({
                        id: 'win',
                        url: 'sound/win.ogg',
                        autoLoad: true,
                        loops: 1,
                        volume: 50
                    });
                }
            });
            soundManager.beginDelayedInit();
        },
        
        hop: function() {
            soundManager.play('hop');
        },
        
        next: function() {
            soundManager.play('next');
        },
        
        fail: function() {
            soundManager.play('fail');
        },
        
        win: function() {
            soundManager.play('win');
        }
    };

    return Music;
});
