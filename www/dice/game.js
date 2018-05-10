/* Скрипт */

var game = {

	// Переменные =========================================

	context: undefined,
	width: undefined,
	height: undefined,

	// Объекты ============================================

	// Игровые спрайты
	sprites: {
		bg: undefined,
		dice: undefined
	},
	// Объект игровой кости
	dice: {
		width: 58,
		height: 58,
		x: 10,
		y: 10,
		frame: 0,
		Hit: function() {
			let start = Date.now();
			let i = 50;
			let tOut = window.setTimeout(function tick(){
				if (i < 300) {
					i += parseInt(Math.random() * 15) + 10;
					if(game.dice.frame++ == 5) game.dice.frame = 0;
				}
				else {
					window.clearTimeout(tOut);
					console.log(game.dice.frame + 1);
					return game.dice.frame + 1;
				}
				tOut = window.setTimeout(tick, i);
			}, 50);
		}
	},

	// Методы =============================================

	// Инициализация
	Init: function() {
		let canvas = document.getElementById("canvas");
		this.context = canvas.getContext("2d");
		this.width = canvas.width;
		this.height = canvas.height;

		window.addEventListener("touchstart", HandleStart, false);
		window.addEventListener("touchmove", HandleMove, false);
		window.addEventListener("touchend", HandleEnd, false);
	},
	// Загрузка необходимого материала
	Load: function() {
		for(let key in this.sprites) {
			this.sprites[key] = new Image();
			this.sprites[key].src = "img/" + key + ".png";
		}
	},
	// Отображение на холсте
	Render: function() {
		this.context.clearRect(0, 0, this.width, this.height);
		this.context.drawImage(this.sprites.bg, 0, 0);
		this.context.drawImage(this.sprites.dice,
			this.dice.frame * this.dice.width, 0,
			this.dice.width, this.dice.height,
			this.dice.x, this.dice.y,
			this.dice.width, this.dice.height);
	},
	// Метод вызывается в начале каждого кадра анимации
	Update: function() {
		this.Render();
	},
	// Метод запуска главной анимации
	Run: function(option) {
		let start = performance.now();

		window.requestAnimationFrame(function run(time){
			let passedTime = time - start;
			game.Update();
			window.requestAnimationFrame(run);
		});

	},
	// Старт приложения
	Start: function() {
		this.Init();
		this.Load();
		this.Run();
	}

};

// Слушатели нажатий на экран
function HandleStart(event) {
	event.preventDefault();
	game.dice.Hit();
}
function HandleMove(event) {
	event.preventDefault();
}
function HandleEnd(event) {
	event.preventDefault();
}

// Старт программы
window.addEventListener("load", function(){
	game.Start();
});