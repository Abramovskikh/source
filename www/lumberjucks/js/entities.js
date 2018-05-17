
let Entities = {
    init: function(data) {

        let background = {
            sprite: new Entities.helpers.Sprite(data.sprite, 0, 32, 640, 360),
            x: 0,
            y: 0,
            w: 640,
            h: 360
        };

        let coinLocations = [[100,100],[140,100],[180,100],
                             [100,140],[140,140],[180,140]];

        /* Добавляем картинку заднего фона в объект data */
        data.entities = {};
        data.entities.background = background;
        data.entities.coinsArray = [];
        coinLocations.forEach(loc => data.entities.coinsArray.push(
            new Entities.helpers.Coin(data.sprite, loc[0], loc[1], 30, 32 )
        ));
    },

    helpers: {
        // Вырезка спрайта из основного изображения
        Sprite: function(img, srcX, srcY, srcW, srcH) {
            this.img = img;
            this.srcX = srcX;
            this.srcY = srcY;
            this.srcW = srcW;
            this.srcH = srcH;
        },
        // Для создания монет
        Coin: function(img, x, y, w, h) {
            this.type = "coin";
            this.sound = new Audio("audio/coin.mp3");
            this.sprite = new Entities.helpers.Sprite(img, 110, 0, 30, 32);
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
    }
};