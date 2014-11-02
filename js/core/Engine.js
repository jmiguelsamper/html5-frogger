define(['core/Resources', 'core/Player', 'core/Enemy', 'core/Score', 'core/Music', 'core/util/WindowUtil'], function(
        Resources, Player, Enemy, Score, Music, WindowUtil) {
    
    var CANVAS_WIDTH = 505;
    var CANVAS_HEIGHT = 606;
    
    function Engine() {
        this.resources = new Resources();
        this.context = createCanvas().getContext('2d');
        this.music = new Music();
        this.music.start();
        this.allEnemies = createEnemies(this.context, this.resources);
        this.player = new Player(this.context, this.resources, this.music);
        this.score = new Score();
        this.lastTime;
    }
    
    function createCanvas() {
        var canvas = document.getElementById('canvas');
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        return canvas;
    }

    // We create 2 enemies per row. The enemies in one row have the same speed, only changes its x.
    function createEnemies(context, resources) {
        var enemies = new Array();
        var enemy = new Enemy(context, resources, 0);
        enemies.push(enemy);
        enemies.push(enemy.cloneTraslated());
        enemy = new Enemy(context, resources, 1);
        enemies.push(enemy);
        enemies.push(enemy.cloneTraslated());
        enemy = new Enemy(context, resources, 2);
        enemies.push(enemy);
        enemies.push(enemy.cloneTraslated());
        return enemies;
    }

    Engine.prototype = {

        start: function() {
            this.resources.load([
                'images/stone-block.png',
                'images/water-block.png',
                'images/grass-block.png',
                'images/enemy-bug.png',
                'images/char-boy.png'
            ]);
            var ref = this;
            this.resources.onReady(function() {
                ref.init(ref); // Pass context
            });
        },
    
        init: function() {
            this.lastTime = Date.now();
            this.main();
        },
    
        main: function () {
            var now = Date.now();
            var dt = (now - this.lastTime) / 1000.0;

            this.update(dt);
            this.render();

            this.lastTime = now;

            var ref = this;
            window.requestAnimationFrame(function() {
                ref.main();
            });
        },

        update: function(dt) {
            this.updateEntities(dt);
            if (this.isThereCollision(this.player)) {
                this.score.decrease();
                this.music.fail();
                this.player.initialPosition();
            }
            if (this.player.reachesTop()) {
                this.nextLevelOrWin();
            }
        },

        updateEntities: function(dt) {
            this.allEnemies.forEach(function(enemy) {
                enemy.update(dt);
            });
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
    
        // FIXME: move stage logic to a Stage object
        render: function() {
            var rowImages = [
                    'images/water-block.png',
                    'images/stone-block.png',
                    'images/stone-block.png',
                    'images/stone-block.png',
                    'images/grass-block.png',
                    'images/grass-block.png'
                ],
                numRows = 6,
                numCols = 5,
                row, col;

            for (row = 0; row < numRows; row++) {
                for (col = 0; col < numCols; col++) {
                    this.context.drawImage(this.resources.get(rowImages[row]), col * 101, row * 83);
                }
            }

            this.renderEntities();
        },

        renderEntities: function() {
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
            this.music.next();
            this.player.initialPosition();
        },
        
        win: function() {
            var finishStyle = document.getElementById('finish').style;
            finishStyle.left = (new WindowUtil().width() / 2 - 200) + 'px';
            finishStyle.display = 'block';
            this.music.win();
            // FIXME: do it right - javascript error
            window.requestAnimationFrame(null);
        }
    };

    return Engine;
});
