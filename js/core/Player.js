define([], function() {

    var START_X = 220;
    var Y_TOP_BOUNDARY = 50;
    var Y_BOTTOM_BOUNDARY = 508;
    var X_LEFT_BOUNDARY = 0;
    var X_RIGHT_BOUNDARY = 438;
    
    var STEP = 41.5; // Half of a cell for better playability

    var PLAYER_WIDTH = 67;
    var PLAYER_HEIGHT = 76;

    function Player(context, resources, music) {
        this.context = context;
        this.resources = resources;
        this.music = music;
        this.initialPosition();
        this.sprite = 'images/char-boy.png';
        captureKeyboardInput(this);
    }
    
    function captureKeyboardInput(ref) {
        document.addEventListener('keyup', function(e) {
            var allowedKeys = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down'
            };
            ref.handleInput(allowedKeys[e.keyCode]);
        });
    }

    Player.prototype = {

        centreX: function() {
            return this.x + PLAYER_WIDTH / 2;
        },
        
        centreY: function() {
            return this.y + PLAYER_HEIGHT / 2;
        },
        
        reachesTop: function() {
            return this.y <= Y_TOP_BOUNDARY;
        },
        
        initialPosition: function() {
            this.x = START_X;
            this.y = Y_BOTTOM_BOUNDARY;
        },
        
        render: function() {
            this.context.drawImage(this.resources.get(this.sprite), this.x, this.y);
        },

        handleInput: function(key) {
            switch(key) {
                case 'up':
                    this.y -= STEP;
                    break;
                case 'down':
                    this.y += STEP;
                    break;
                case 'left':
                    this.x -= STEP;
                    break;
                case 'right':
                    this.x += STEP;
                    break;
                default:
                    return;
            }         
            this.music.hop();
            this.checkBoundaries();
        },
        
        checkBoundaries: function() {
            if (this.y <= Y_TOP_BOUNDARY) {
                this.y = Y_TOP_BOUNDARY;
            }
            if (this.y >= Y_BOTTOM_BOUNDARY) {
                this.y = Y_BOTTOM_BOUNDARY;
            }
            if (this.x <= X_LEFT_BOUNDARY) {
                this.x = X_LEFT_BOUNDARY;
            }
            if (this.x >= X_RIGHT_BOUNDARY) {
                this.x = X_RIGHT_BOUNDARY;
            }
        }
    };
    
    return Player;
});
