define([], function() {
    
    var STAGE_WIDTH = 505;
    var ENEMY_WIDTH = 100;
    var ENEMY_HEIGHT = 67;
    var CELL_HEIGHT = 83;
    var COLLISION_DISTANCE = 60;
    
    function Enemy(context, resources, row) {
        this.context = context;
        this.resources = resources;
        this.row = row;
        this.x = Math.random() * STAGE_WIDTH;
        this.y = 140 + CELL_HEIGHT * row;
        this.speed = randomSpeed();
        this.sprite = 'images/enemy-bug.png';
    }

    // Random speed, sometimes backwards
    function randomSpeed() {
        var direction = Math.random() >= 0.4 ? 1 : -1; 
        return direction * (50 + Math.random() * 50);
    }

    Enemy.prototype = {

        // Returns a copy of this Enemy with the same speed but in a different x position. 
        cloneTraslated: function() {
            var clone = new Enemy(this.context, this.resources, this.row);
            clone.x = (this.x + STAGE_WIDTH / 2) % STAGE_WIDTH; 
            clone.speed = this.speed;
            return clone;
        },
        
        centreX: function() {
            return this.x + ENEMY_WIDTH / 2;
        },
        
        centreY: function() {
            return this.y + ENEMY_HEIGHT / 2;
        },
        
        increaseSpeed: function() {
            this.speed = this.speed * 1.15;
        },
        
        // Movement must be multiplied by the dt parameter
        // to ensure the game runs at the same speed in all computers.
        update: function(dt) {
            if (this.x >= STAGE_WIDTH) {
                // Cross right border
                this.x = -ENEMY_WIDTH;
            } else if (this.x <= -ENEMY_WIDTH) {
                // Cross left border
                this.x = STAGE_WIDTH;
            }
            this.x += this.speed * dt;
        },

        render: function() {
            this.context.drawImage(this.resources.get(this.sprite), this.x, this.y);
        },
        
        isThereCollision: function(player) {
            return this.distance(player) < COLLISION_DISTANCE;
        },
        
        distance: function(player) {
            return Math.sqrt(
                Math.pow(this.centreX() - player.centreX(), 2) +
                Math.pow(this.centreY() - player.centreY(), 2)
            ); 
        }
    };
    
    return Enemy;
});
