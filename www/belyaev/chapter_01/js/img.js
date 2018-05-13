
let im = {
    init: function() {
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");

        let smile = new Image();
        smile.src = "img/smile.png"

        smile.addEventListener("load", function() {

            let utilities = {
                angle: 0, scale: .5
            };

            let data = {
                c: canvas,
                cc: context,
                sprite: this,
                animationFrame: 0,
                utility: utilities
            }

            Input.init(data);

            update(data);

        }, false);
    }
}

im.init();

let update = function(data) {
    let loop = function() {
        data.animationFrame++;
        render(data);
        window.requestAnimationFrame(loop);
    };
    loop();
};

render = function(data) {
    let c = data.cc; // context
    let w = data.c.width;
    let h = data.c.height;
    let tch = data.input.touch;

    c.clearRect(0, 0, w, h);
    

    c.fillStyle = "green";
    c.fillRect(w - w/2, h - h/2, w/2, h/2);

    c.save();


    n = data.animationFrame;
    if ((n % 100 >= 0) && (n % 100 < 50)) data.utility.angle += 5;
    else data.utility.angle -= 5;
    
    if ((n % 100 >= 0) && (n % 100 < 50)) data.utility.scale += .05;
    else data.utility.scale -= .05;

    let pos;
    
    if (tch.down.touch) {
        pos = tch.locationHandler();
        console.log(pos.x, pos.y);
        c.translate(pos.x, pos.y);
        c.rotate(data.utility.angle * Math.PI / 180);
        c.scale(data.utility.scale, data.utility.scale);
    }
    
    c.fillStyle = "green";
    c.fillRect(-200, -200, 400, 400);

    c.drawImage(data.sprite, 0, 0, 800, 800, -100, -100, 200, 200);

    c.restore();

    c.fillStyle = "brown";
    c.fillRect(0, 0, w/2, h/2);
};

let Input = {
    init: function(data) {
        data.c.addEventListener("touchstart", function(e){
            e.preventDefault();
            Input.helpers.down.touch = {
                point: {
                    x: e.changedTouches[0].clientX,
                    y: e.changedTouches[0].clientY
                },
            };
        }, false);
        data.c.addEventListener("touchmove", function(e){
            e.preventDefault();
            Input.helpers.down.touch = {
                point: {
                    x: e.changedTouches[0].clientX,
                    y: e.changedTouches[0].clientY
                },
            };
        }, false);
        data.c.addEventListener("touchend", function(e){
            e.preventDefault();
            delete Input.helpers.down.touch;
        }, false);

        data.input = {};
        data.input.touch = this.helpers;
    },
    
    helpers: {
        locationHandler: function() {
            if (this.down.touch) return this.down.touch.point;
            else return;
        },
        down: {}
    }
};


