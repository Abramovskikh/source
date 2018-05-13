let App = {

    init: function() {
        let canvas = document.getElementsByTagName("canvas")[0];
        let context = canvas.getContext("2d");
        let width = canvas.width;
        let height = canvas.height;

        let data = {
            c: canvas,
            cc: context,
            w: width,
            h: height,
            animationFrame: 0
        };

        Render.init(data);
        App.run(data);
    },

    run: function(data) {

        let loop = function(){
            Render.draw(data);
            data.animationFrame++;
            window.requestAnimationFrame(loop);
        };

        loop();
    }

};

let Render = {
    init: function(data) {
        
    },

    draw: function(data) {
        let c = data.cc; // Context
        let x0 = data.w / 2;
        let y0 = data.h / 2;
        let px, py;

        c.clearRect(0, 0, data.w, data.h);

        c.beginPath();
        px = x0 - 50; py = y0 - 25; 
        c.moveTo(px, py);
        py -= 50;
        c.lineTo(px, py);
        px += 25;
        py -= 25;
        c.lineTo(px, py);
        px += 25;
        py += 25;
        c.lineTo(px, py);
        
        py += 50;
        c.lineTo(px, py);
        px -= 50;
        c.lineTo(px, py);
        py -= 50;
        c.moveTo(px, py);
        px += 50;
        c.lineTo(px, py);

        c.stroke();
    }
}

window.addEventListener("load",function(){
    App.init();
});