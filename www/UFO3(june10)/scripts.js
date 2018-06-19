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

        // Создание астероидов
        let asteroidLocations = [[164, 304], [164, 340], [164, 376]];
        data.entities.asteroidArray = [];
        asteroidLocations.forEach(function(location) {
            data.entities.asteroidArray.push(new Entities.tools.Asteroid(data.sprite,
                location[0], location[1], 32, 32));
        });

        // Создание игрового персонажа (космический корабль)
        let spaceship = new Entities.tools.Spaceship(data.sprite, 155, 580, 50, 50);
        data.entities.spaceship = spaceship;
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
        },
        // Класс для создания объекта астероида
        Asteroid: function(img, x, y, w, h) {
            let self = this;
            this.type = "asteroid";
            this.sprite = new Entities.tools.Sprite(img, 0, 640, 32, 32);
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            // Виды анимации для объекта
            this.asteroidAnimations = {
                // Вращение
                spin: {
                    frames: [ // Кадры с главного спрайта
                        new Entities.tools.Sprite(img, 0, 640, 32, 32), new Entities.tools.Sprite(img, 32, 640, 32, 32),
                        new Entities.tools.Sprite(img, 64, 640, 32, 32), new Entities.tools.Sprite(img, 96, 640, 32, 32),
                        new Entities.tools.Sprite(img, 128, 640, 32, 32), new Entities.tools.Sprite(img, 160, 640, 32, 32),
                        new Entities.tools.Sprite(img, 192, 640, 32, 32), new Entities.tools.Sprite(img, 224, 640, 32, 32),
                        new Entities.tools.Sprite(img, 256, 640, 32, 32), new Entities.tools.Sprite(img, 288, 640, 32, 32),
                        new Entities.tools.Sprite(img, 320, 640, 32, 32), new Entities.tools.Sprite(img, 0, 672, 32, 32),
                        new Entities.tools.Sprite(img, 32, 672, 32, 32), new Entities.tools.Sprite(img, 64, 672, 32, 32),
                        new Entities.tools.Sprite(img, 96, 672, 32, 32), new Entities.tools.Sprite(img, 128, 672, 32, 32),
                        new Entities.tools.Sprite(img, 160, 672, 32, 32), new Entities.tools.Sprite(img, 192, 672, 32, 32),
                        new Entities.tools.Sprite(img, 224, 672, 32, 32)
                    ],
                    currentFrame: 0 // Текущий кадр
                }
            };
            // Состояние в котором находится анимация объекта
            this.states = {
                // Вращение
                spinning: {
                    animation: function(data) {
                        if(data.frames % 5 === 4) {
                            self.sprite = self.asteroidAnimations.spin.frames[
                                self.asteroidAnimations.spin.currentFrame
                            ];
                            if(++self.asteroidAnimations.spin.currentFrame >= self.asteroidAnimations.spin.frames.length)
                                self.asteroidAnimations.spin.currentFrame = 0;
                        }
                    }
                }
            }
        },
        // Класс создания игрока (космический корабль)
        Spaceship: function(img, x, y, w, h) {
            let self = this;
            this.sprite = new Entities.tools.Sprite(img, 0, 710, 50, 50);
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            // Варианты анимации спрайта
            this.spriteAnimations = {
                forward: Entities.tools.Sprite(img, 0, 710, 50, 50),
                moveLeft: {
                    frames: [
                        new Entities.tools.Sprite(img, 50, 710, 50, 50),
                        new Entities.tools.Sprite(img, 100, 710, 50, 50),
                        new Entities.tools.Sprite(img, 150, 710, 50, 50),
                        new Entities.tools.Sprite(img, 200, 710, 50, 50),
                        new Entities.tools.Sprite(img, 250, 710, 50, 50),
                        new Entities.tools.Sprite(img, 300, 710, 50, 50)
                    ],
                    currentFrame: 0
                },
                moveRight: {
                    frames: [
                        new Entities.tools.Sprite(img, 50, 760, 50, 50),
                        new Entities.tools.Sprite(img, 100, 760, 50, 50),
                        new Entities.tools.Sprite(img, 150, 760, 50, 50),
                        new Entities.tools.Sprite(img, 200, 760, 50, 50),
                        new Entities.tools.Sprite(img, 250, 760, 50, 50),
                        new Entities.tools.Sprite(img, 300, 760, 50, 50)
                    ],
                    currentFrame: 0
                },
            },
            // Состояние анимации
            this.states = {
                // Без движения
                forward: {
                    animation: function(data) {
                        self.sprite = spriteAnimations.forward;
                    }
                },
                left: {
                    animation: function(data) {
                        
                    }
                }
            }
        }
    }
};

/* Менеджер анимаций */
let Animations = {
    // Покадровая анимауция
    update: function(data) {
        Animations.asteroid(data);
    },
    // Объекты анимации
    asteroid: function(data) {
        data.entities.asteroidArray.forEach(function(asteroid){
            asteroid.states.spinning.animation(data);
        });
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
        let context = data.canvas.fCtx;
        // Очистка экра перед рисованием
        context.clearRect(0, 0, data.canvas.w, data.canvas.h);
        // Сохраняем состояние холста
        context.save();

        // Рисуем игрока (космический корабль)
        Render.tools.drawSprite(data.entities.spaceship, context);

        // Рисуем астероиды
        data.entities.asteroidArray.forEach(function(asteroid){
            Render.tools.drawSprite(asteroid, context);
        });
        // Восстонавливаем состояние холста
        context.restore();
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
            Game.animation(data);
            data.frames++;
            window.requestAnimationFrame(loop);
        };
        loop();
    },

    // Контроль анимации
    animation: function(data) {
        Animations.update(data);
    },

    // Контроль отображения
    render: function(data) {
        Render.update(data);
    }
};

Game.init();