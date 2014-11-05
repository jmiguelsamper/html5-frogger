define(['core/Stage', 'core/Score', 'core/Music', 'core/util/Timer'], function(Stage, Score, Music, Timer) {
    
    function Engine() {
        this.music = new Music();
        this.stage = new Stage(this.music);
        this.score = new Score(this.music);
    }
    
    Engine.prototype = {

        onReady: function(func) {
            this.stage.onReady(func);
        },
    
        start: function() {
            this.stage.createCanvas();
            this.allEnemies = this.stage.createEnemies();
            this.player = this.stage.createPlayer(); 
            this.timer = new Timer();
            this.nextFrame();
        },
    
        nextFrame: function () {
            this.main();

            var ref = this;
            window.requestAnimationFrame(function() {
                ref.nextFrame();
            });
        },

        main: function() {
            var dt = this.timer.nextDelta();
            this.allEnemies.forEach(function(enemy) {
                enemy.update(dt);
            });
            if (this.isThereCollision(this.player)) {
                this.score.decrease();
                this.player.initialPosition();
            }
            if (this.player.reachesTop()) {
                this.nextLevelOrWin();
            }
            this.render();
        },

        isThereCollision: function() {
            for (var i = 0; i < this.allEnemies.length; i++) {
                var enemy = this.allEnemies[i];
                if (enemy.isThereCollision(this.player)) {
                    return true;
                }
            }
            return false;
        },
    
        render: function() {
            this.stage.render();
            this.allEnemies.forEach(function(enemy) {
                enemy.render();
            });
            this.player.render();
        },

        nextLevelOrWin: function() {
            this.score.increase();
            if (this.score.gameFinished()) {
                this.win();
            } else {
                this.nextLevel();
            }
        },

        nextLevel: function() {
            this.allEnemies.forEach(function(enemy) {
                enemy.increaseSpeed();
            });
            this.player.initialPosition();
        },
        
        win: function() {
            this.stopAnimationFrame();
            this.stage.win();
        },
        
        stopAnimationFrame: function() {
            this.main = function() {};
        }
    };

    return Engine;
});
