define(['soundmanager2'], function(soundManager) {

    function Music() {
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
                    volume: 20
                });
                createSound('hop');
                createSound('next');
                createSound('fail');
                createSound('win');
            }
        });
        soundManager.beginDelayedInit();
    }

    function createSound(id) {
        soundManager.createSound({
            id: id,
            url: 'sound/' + id + '.ogg',
            autoLoad: true,
            loops: 1,
            volume: 50
        });
    }

    Music.prototype = {
        
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
            soundManager.stop('backgroundMusic');
        }
    };

    return Music;
});
