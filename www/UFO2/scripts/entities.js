// Игровые объекты
let Entities = {
    // Инициализация данных
    init: function(data) {

        // Задний фон
        let background = {
            sprite: new Entities.helpers.Sprite(data.sprite, 0, 198, 640, 360),
            x: 0,
            y: 0,
            w: 640 * 2,
            h: 360,
            speed: 2,
            move: function(data){
                if(background.x + background.w / 2 <= 0) background.x = 0
                background.x -= background.speed;
            }
        };

        // Добавляем объект к глобальным данным
        data.entities = {};
        data.entities.background = background;
    },

    // Различные вспомогательные инструменты
    helpers: {
        // Класс с данными о нужной картинки на главном спрайте
        Sprite: function(img, srcX, srcY, srcW, srcH) {
            this.img = img;
            this.srcX = srcX;
            this.srcY = srcY;
            this.srcW = srcW;
            this.srcH = srcH;
        }
    }
};