define([], function() {

    var WIN_SCORE = 100;
    var INCREASE_SCORE = 10;
    var DECREASE_SCORE = 5;
    
    function Score(music) {
        this.music = music;
        this.points = 0;
    }

    Score.prototype = {

        increase: function() {
            this.modifyPoints(INCREASE_SCORE);
            this.music.next();
            this.render();
        },

        decrease: function() {
            this.modifyPoints(-DECREASE_SCORE);
            this.music.fail();
            this.render();
        },

        modifyPoints: function(delta) {
            this.points += delta;
            if (this.points < 0) {
                this.points = 0;
            }
        },
        
        render: function() {
            document.getElementById('score').innerHTML = this.points;
        },

        gameFinished: function() {
            return this.points >= WIN_SCORE;
        }
    };
    
    return Score;
});
