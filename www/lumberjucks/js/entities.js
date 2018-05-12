
let Entities = {
    init: function(data) {

        let background = {
            sprite: new Entities.helpers.Sprite(data.sprite, 0, 32, 640, 360),
            x: 0,
            y: 0,
            w: 640,
            h: 360
        };

        /* Добавляем картинку заднего фона в объект data */
        data.entities = {};
        data.entities.background = background;
    },

    helpers: {
        Sprite: function(img, srcX, srcY, srcW, srcH) {
            this.img = img;
            this.srcX = srcX;
            this.srcY = srcY;
            this.srcW = srcW;
            this.srcH = srcH;
        }
    }
};