
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

        let jack = new Entities.helpers.Jack(data.sprite, 60, 0, 22, 32);

        let exitPipe = new Entities.helpers.ExitPipe(620, 340, 100, 50);

        let wallLocations = [[0, 0, 40, 640]];

        /* Добавляем картинку заднего фона в объект data */
        data.entities = {};
        data.entities.background = background;
        data.entities.jack = jack;
        data.entities.exitPipe = exitPipe;
        data.entities.coinsArray = [];
        data.entities.wallArray = [];
        wallLocations.forEach(loc => data.entities.wallArray.push(
            new Entities.helpers.Wall(loc[0], loc[1], loc[2], loc[3] )
        ));
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

        // Персонаж
        Jack: function(img, x, y, w, h) {
            this.jumpSound = new Audio("audio/jump.mp3");
            this.sprite = new Entities.helpers.Sprite(img, 0, 0, 22, 32);
            this.spriteAnimation = {
                walkRight: {
                    frames: [new Entities.helpers.Sprite(img, 0, 0, 22, 32),
                        new Entities.helpers.Sprite(img, 22, 0, 22, 32),
                        new Entities.helpers.Sprite(img, 44, 0, 22, 32),
                        new Entities.helpers.Sprite(img, 66, 0, 22, 32),
                        new Entities.helpers.Sprite(img, 88, 0, 22, 32)],
                    currentFrame: 0
                },
                walkLeft: {
                    frames: [new Entities.helpers.Sprite(img, 0, 0, 22, 32),
                        new Entities.helpers.Sprite(img, 22, 0, 22, 32),
                        new Entities.helpers.Sprite(img, 44, 0, 22, 32),
                        new Entities.helpers.Sprite(img, 66, 0, 22, 32),
                        new Entities.helpers.Sprite(img, 88, 0, 22, 32)],
                    currentFrame: 0
                },
                standRight: new Entities.helpers.Sprite(img, 0, 0, 22, 32),
                standLeft: new Entities.helpers.Sprite(img, 0, 0, 22, 32),
                jumpRight: new Entities.helpers.Sprite(img, 0, 0, 22, 32),
                jumpLeft: new Entities.helpers.Sprite(img, 0, 0, 22, 32)
            };
            this.direction = "right";
            this.velY = 0;
            this.velX = 3.8;
            this.coins = 0;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },

        // Для создания монет
        Coin: function(img, x, y, w, h) {
            let self = this;
            this.type = "coin";
            this.sound = new Audio("audio/coin.mp3");
            this.sprite = new Entities.helpers.Sprite(img, 110, 0, 30, 32);
            this.spriteAnimation = {
                spin: {
                    frames: [new Entities.helpers.Sprite(img, 110, 0, 30, 32),
                            new Entities.helpers.Sprite(img, 140, 0, 30, 32),
                            new Entities.helpers.Sprite(img, 170, 0, 30, 32),
                            new Entities.helpers.Sprite(img, 200, 0, 30, 32),
                            new Entities.helpers.Sprite(img, 230, 0, 30, 32),
                            new Entities.helpers.Sprite(img, 260, 0, 30, 32),
                            new Entities.helpers.Sprite(img, 290, 0, 30, 32),
                            new Entities.helpers.Sprite(img, 320, 0, 30, 32),
                        ],
                    currentFrame: 0                    
                }
            };
            this.states = {
                spinning: {
                    animation: function(data) {
                        if(data.animationFrame % 13 === 0) {
                            self.sprite = self.spriteAnimation.spin.frames[self.spriteAnimation.spin.currentFrame++];
                            if(self.spriteAnimation.spin.currentFrame >= self.spriteAnimation.spin.frames.length)
                                self.spriteAnimation.spin.currentFrame = 0;
                        }
                    }
                }
            };
            this.currentState = self.states.spinning;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },

        Wall: function(x, y, w, h) {
            this.type = "wall";
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },
        ExitPipe: function(x, y, w, h) {
            this.type = "exitPipe";
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },
    }
};