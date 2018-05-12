
let Input = {

    init: function(data) {
        /* Работа с touch */
        window.addEventListener("touchstart", null, false);
        window.addEventListener("touchmove", null, false);
        window.addEventListener("touchend", null, false);
        /* Работа с клавишами */
        window.addEventListener("keydown", function(event){
            Input.helpers.down[event.keyCode] = true;
        },false);
        window.addEventListener("keyup", function(event){
            delete Input.helpers.down[event.keyCode];
            delete Input.helpers.pressed[event.keyCode];
        },false);
    },

    helpers: {
        isDown: function(code) {
            return Input.helpers.down[code];
        },
        isPressed: function(code) {
            if (Input.helpers.pressed[code]) {
                return false;
            } else if (Input.helpers.down[code]) {
                return Input.helpers.pressed[code] = true;
            }
            return false;
        },
        down: {},
        pressed: {}
    }
};