/* Игровая логика */

/* Игровые сущности */
let Entities = {
    // Настройка
    init: function(data) {

        // Создаем в глобальных данных место для наборов
        data.entities = {};

        // Задний фон игры статический
        let background = {
            sprite: new Entities.tools.Sprite(data.sprite, 0, 0, 360, 640),
            x: 0, y: 0, w: 360, h: 640
        };
        data.entities.background = background;  // Добавление в набор

    },
    // Инструменты настройки
    tools: {
        // Класс для создания спрайта с главной игровой картинки
        Sprite: function(img, srcX, srcY, srcW, srcH) {
            this.img = img;
            this.srcX = srcX;
            this.srcY = srcY;
            this.srcW = srcW;
            this.srcH = srcH;
        }
    }
};

/* Диспетчер отображения */
let Render = {
    // Настройка
    init: function(data) {
        //Задний фон. Статический
        Render.tools.drawSprite(data.entities.background, data.canvas.bCtx);
    },
    // Покадровая перерисовка
    update: function(data) {

    },
    // Инструменты для визуализации
    tools: {
        // Рисование на холсте спрайтов
        drawSprite: function(entity, ctx) {
            ctx.save();
            ctx.drawImage(entity.sprite.img,
                entity.sprite.srcX, entity.sprite.srcY,
                entity.sprite.srcW, entity.sprite.srcH,
                entity.x, entity.y, entity.w, entity.h);
            ctx.restore();
        }
    }
};

/* Менеджер игры */
let Game = {
    // Инициализация параметров игры
    init: function() {
        // Доступ к холстам
        let bgCanvas = document.getElementById("bg-canvas");
        let fgCanvas = document.getElementById("fg-canvas");
        // Объект с доступам к холстам и их API
        let canvas = {
            bgCanvas: bgCanvas,
            fgCanvas: fgCanvas,
            bCtx: bgCanvas.getContext("2d"),
            fCtx: fgCanvas.getContext("2d"),
            w: bgCanvas.width,
            h: bgCanvas.height
        };
        // Определение и инициализация главного спрайта игры
        let spriteSheet = new Image();
        spriteSheet.src = "img/spriteUFO.png";
        // Событие полной загрузки спрайта
        spriteSheet.addEventListener("load", function(){
            // Глобальные игровые данные
            let data = {
                frames: 0,
                canvas: canvas,
                sprite: this
            };

            Entities.init(data);    // Настройка наборов
            Render.init(data);      // Настройка визуализатора
            Game.run(data);         // Запуск игрового цикла
        });
    },

    // Запуск игры
    run: function(data) {
        let loop = function() {
            Game.render(data);
            data.frames++;
            window.requestAnimationFrame(loop);
        };
        loop();
    },

    // Контроль отображения
    render: function(data) {
        Render.update(data);
    }
};

Game.init();