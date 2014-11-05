define(['core/Resources', 'core/Enemy', 'core/Player', 'core/util/WindowUtil'], function(Resources, Enemy, Player, WindowUtil) {
    
    var CANVAS_WIDTH = 505;
    var CANVAS_HEIGHT = 606;
    var CELL_WIDTH = 101;
    var CELL_HEIGHT = 83;
    var NUM_ROWS = 6;
    var NUM_COLS = 5;
    
    function Stage(music) {
        this.resources = new Resources();
        this.music = music;
        this.resources.load([
            'images/stone-block.png',
            'images/water-block.png',
            'images/grass-block.png',
            'images/enemy-bug.png',
            'images/char-boy.png'
        ]);
    }

    Stage.prototype = {
        
        onReady: function(func) {
            this.resources.onReady(func);
        },

        createCanvas: function() {
            var canvas = document.getElementById('canvas');
            canvas.width = CANVAS_WIDTH;
            canvas.height = CANVAS_HEIGHT;
            this.context = canvas.getContext('2d');
        },

        // We create 2 enemies per row. The enemies in one row have the same speed, only changes its x.
        createEnemies: function() {
            var enemies = new Array();
            var enemy = new Enemy(this.context, this.resources, 0);
            enemies.push(enemy);
            enemies.push(enemy.cloneTraslated());
            enemy = new Enemy(this.context, this.resources, 1);
            enemies.push(enemy);
            enemies.push(enemy.cloneTraslated());
            enemy = new Enemy(this.context, this.resources, 2);
            enemies.push(enemy);
            enemies.push(enemy.cloneTraslated());
            return enemies;
        },

        createPlayer: function() {
            return new Player(this.context, this.resources, this.music);
        },

        render: function() {
            var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png'
            ];
            for (var row = 0; row < NUM_ROWS; row++) {
                for (var col = 0; col < NUM_COLS; col++) {
                    this.context.drawImage(this.resources.get(rowImages[row]), col * CELL_WIDTH, row * CELL_HEIGHT);
                }
            }
        },
        
        win: function() {
            var finishStyle = document.getElementById('finish').style;
            finishStyle.left = (new WindowUtil().width() / 2 - 200) + 'px';
            finishStyle.display = 'block';
            this.music.win();
        }
    };

    return Stage;
});
