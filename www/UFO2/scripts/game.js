/* Игровой менеджер */
let Game = {
    // Инициализация данных
    init: function() {
        // ПОлучение холстов 
        let bgCanvas = document.getElementById("bg-canvas");
        let fgCanvas = document.getElementById("fg-canvas");

        // Объект для работы с холстом
        let canvas = {
            bCanvas: bgCanvas,
            fCanvas: fgCanvas,
            bCtx: bgCanvas.getContext("2d"),
            fCtx: fgCanvas.getContext("2d")
        };

        // Подгружаем главный спрайт с тайлами
        let spriteSheet = new Image();
        spriteSheet.src = "img/sprite.png";

        // После полной загрузки игрового спрайта стартовать программу
        spriteSheet.addEventListener("load", function() {
            
            // Главный объект с данными игры
            let data = {
                animationFrame: 0,  // Кадры анимации
                canvas: canvas,     // Холтсы
                sprite: this        // Картинка
            };

            // Настройка игровых объектов
            Entities.init(data);
            // Настройка отображения
            Render.init(data);
            // Запуск
            Game.run(data);

        }, false);
    },

    // Старт программы
    run: function(data) {

        // Запуск анимации
        let loop = function() {
            data.animationFrame++;
            console.log(data.animationFrame);
            window.requestAnimationFrame(loop);
        };
        loop();
    }
};

Game.init();