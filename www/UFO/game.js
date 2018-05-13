var game = {

	// переменные

	context: undefined,			// Получение API холста
	width: undefined,			// Ширина игрового экрана
	height: undefined,			// Высота игрового экрана
	frames: 0,					// Кол-во проигранных кадров

	// объекты

	sprites: {					// Картинки в игре:
		ufo_bg: undefined,		// _задний фон
		ship: undefined,		// космический корабль
		asteroid: undefined		// астероид
	},

	ship: {						// Объект игрока в виде коскорабля
		x: 0,					// Положение на экране по горизонтали
 		y: 0,					// Положение на экране по вертикали
		width: 140,				// Ширина корабля
		height: 70,				// Высота корабля
	},
	bg: {						// Задний фон как объект для управления им
		x: 0,
		y: 0,
		// Скорость
		velocity: 5	
	},
	asteroid: {
		x: 0,
		y: 0,
		width: 128,
		height: 128
	},

	// методы

	init: function() {
		var canvas = document.getElementById("fg-canvas");
		this.context = canvas.getContext("2d");
		this.width = canvas.width;
		this.height	= canvas.height;

		canvas.addEventListener("touchstart", hendleStart, false);
		canvas.addEventListener("touchmove", hendleMove, false);
		canvas.addEventListener("touchend", hendleEnd, false);
	},

	load: function() {
		for(var key in this.sprites) {
			this.sprites[key] = new Image();
			this.sprites[key].src = "sprites/" + key + ".png";
		}
	},

	render: function() {
		this.context.clearRect(0, 0, this.width, this.height);
		this.context.drawImage(this.sprites.ufo_bg, this.bg.x, this.bg.y);
		this.context.drawImage(this.sprites.ufo_bg, this.bg.x + this.width, this.bg.y);
		this.context.drawImage(this.sprites.ship, this.ship.x, this.ship.y);
		this.context.drawImage(this.sprites.asteroid, 
			0, 0, 128, 128, 200, 200, 128, 128);
	},

	update: function() {

		// Движение фона
		if(this.bg.x <= -this.width) this.bg.x = 0;
		this.bg.x -= this.bg.velocity;

	},

	run: function() {

		this.render();
		this.update();

		window.requestAnimationFrame(function() {
			game.frames++;

			game.run();
		});
	},

	start: function() {
		this.init();
		this.load();
		this.run();
	}

};

// Обработчики событий
function hendleStart(e) {
	e.preventDefault();
	handle(e.changedTouches[0]);
}
function hendleMove(e) {
	e.preventDefault();
	handle(e.changedTouches[0]);
}
function hendleEnd(e) {
	e.preventDefault();
	handle(e.changedTouches[0]);
}

function handle(t) {
	game.ship.y = t.clientY - game.ship.height / 2;
	game.ship.x = t.clientX - game.ship.width / 2;;
}

window.addEventListener("load",function(){
	game.start();
});