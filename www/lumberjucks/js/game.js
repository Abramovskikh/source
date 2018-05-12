/* Главный скрипт для web-приложения Lumberjacks */

// Глобальный объект со всей логикой
let Game = {

    // Инициализация игры
    init: function() {

        // Получение двух холстов в теле документа
        let bgCanvas = document.getElementById("bg-canvas");
        let fgCanvas = document.getElementById("fg-canvas");

        // Общее представление о холсте
        let canvas = {
            bgCanvas: bgCanvas,
            fgCanvas: fgCanvas,
            bCtx: bgCanvas.getContext("2d"),
            fCtx: fgCanvas.getContext("2d")
        };

        // Добавление кртинки фона
        let backgroundSheet = new Image(640, 360);
        backgroundSheet.src = "img/background.png";

        // Старт программы по завершению загрузки изображения 
        backgroundSheet.addEventListener("load", function() {

            // Данные для обработки анимации
            let data = {
                animationFrame: 0,
                canvas: canvas,
                sprite: this
            };

            // Подготовка пользовательского ввода
            Input.init(data);
            // Подготовка материала
            Entities.init(data);
            Render.init(data);
            // Запуск анимации
            Game.run(data);

        }, false);
    },

    // Запуск анимации
    run: function(data) {
        
        // Функция покадровой анимации
        let loop = function(time) {

            window.requestAnimationFrame(loop);
        };

        // Вызов анимации
        loop();
    }

};