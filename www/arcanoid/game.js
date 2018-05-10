
var game = {

	// Переменные для работы программы
	running: true,	// Флаг запуска игры
	ctx: undefined,	// API - элемента canvas (контекст)
	width: 640,	// Ширина холста
	height: 360, // Высота холста
	rows: 4,	// Кол-во рядов для сетки с объектами block
	cols: 8,	// Кол-во колонок для сетки
	score: 0,	// Очки за игру
	blocks: [],	// Массив для хранения игровых блоков

	// Объекты для использования в программе
	sprites: { // Спрайты (картинки) для программы
		// Название свойства совпадает с названием файла 
		background: undefined,	// Задний фон 
		paddle: undefined, 	// Игровая платформа
		ball: undefined,	// Игровой шарик
		block: undefined	// Игровой блок
	},
	paddle: { // Игровая платформа
		x: 300,
		y: 300,
		width: 104,
		height: 24,
		velocity: 6,
		dx: 0,
		ball: undefined,
		releaseBall: function() {
			this.ball.jump();
			this.ball = false;
		},
		move: function() {
			this.x += this.dx;
			if (this.ball) this.ball.x += this.dx;
		},
		stop: function() {
			this.dx = 0;
		}
	},
	ball: { // Объект игрового шарика
		x: 340,
		y: 278,
		width: 22,
		height: 22,
		frame: 0,
		dx: 0,
		dy: 0,
		velocity: 3,
		move: function() {
			this.x += this.dx;
			this.y += this.dy;
		},
		jump: function() {
			this.dy = -this.velocity;
			this.dx = -this.velocity;

			this.animate();
		},
		animate: function() {
			window.setInterval(function(){
				console.log(game.ball.frame);
				if (++game.ball.frame > 3) game.ball.frame = 0;
			},100);
		},
		// Реализация столкновений
		collide: function(element) {
			// Координаты на следующем кадре анимации
			var x = this.x + this.dx;
			var y = this.y + this.dy;

			if (x + this.width > element.x && // Правая сторона шарика
				x < element.x + element.width && // Левая сторона шарика
				y + this.height > element.y && // Нижняя сторона
				y < element.y + element.height) { // Верхняя сторона шарика
				return true;
			}

			return false;
		},
		bumpBlock: function(block) {
			this.dy *= -1;
			block.isAlive = false;
			++game.score;

			if (game.score >= game.blocks.length) {
				game.over("You win!");
			}
		},
		checkLeftSidePlatform: function(paddle) {
			return this.x + this.width / 2 < paddle.x + paddle.width / 2;
		},
		bumpPaddle: function(paddle) {
			this.dy = -this.velocity;
			this.dx = this.checkLeftSidePlatform(paddle) ? -this.velocity : this.velocity;
		},

		checkBounds: function() {
			// Координаты на следующем кадре анимации
			var x = this.x + this.dx;
			var y = this.y + this.dy;

			if (x < 0) { // Столкновение с левой стенкой
				this.x = 0;
				this.dx = this.velocity;
			} else if (x + this.width > game.width) {	// Столкновение с правой стенкой
				this.x = game.width - this.width;
				this.dx = -this.velocity;
			} else if (y < 0) {	// Столкновение с верхней стенкой
				this.y = 0;
				this.dy = this.velocity;
			} else if (y + this.height > game.height) {	// Вылет вниз
				// Game Over
				game.over("Game Over");
			}
		}
	},	

	// Инициализация переменных
	init: function() {
		// Инициализация холсята и получение API элемента canvas
		var canvas = document.getElementById("canvas");
		this.ctx = canvas.getContext("2d");

		window.addEventListener("keydown", function(e) {
			// Код клавиши налево
			if (e.keyCode == 37) {
				game.paddle.dx = -game.paddle.velocity;
			} 
			// Код клавиши направо
			else if (e.keyCode == 39) {
				game.paddle.dx = game.paddle.velocity;
			}
			// Код клавиши пробел
			else if (e.keyCode == 32) {
				game.paddle.releaseBall();
			}
		});
		window.addEventListener("keyup", function(e) {
			// При отпускании клавиши скорость обнуляется
			game.paddle.stop();
		});
	},

	// Загрузка необходимых материалов
	load: function() {
		// Создание и загрузка необходимых картинок
		//Имя файлов изображении должно совпадать с именами свойств объекта sprites
		for ( var key in this.sprites) {
			this.sprites[key] = new Image();
			this.sprites[key].src = "img/" + key + ".png";			
		}
	},

	// Метод создания сетки из игровых блоков
	create: function() {
		// Создаем строки с блоками
		for (var row = 0; row < this.rows; row++) {
			// Создаем колонки с блоками
			for (var col = 0; col < this.cols; col++) {
				this.blocks.push({
					x: 68 * col + 50,
					y: 38 * row + 35,
					width: 64, 
					height: 32,
					isAlive: true
				});
			}
		}
		
	},

	// Запуск программы (игры)
	start: function() {
		// Запуск метода инициализации
		this.init();
		// Запуск метода загрузки необходимых материалов
		this.load();
		// Создание сетки с игровыми блоками
		this.create();
		// Запуск анимации
		this.run();
	},

	// Рисование на холсте
	render: function() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.drawImage(this.sprites.background, 0, 0);
		this.ctx.drawImage(this.sprites.paddle, this.paddle.x, this.paddle.y);
		this.ctx.drawImage(this.sprites.ball, 
			// Выбор угла прямоугольника для отрисовки на изображении файла с шариком
			this.ball.width * this.ball.frame, 0,
			// Ширина и высота для вырезания картинки с картинки с шариком
			this.ball.width, this.ball.height, 
			// Расположение на холте
			this.ball.x, this.ball.y,
			// Размер картинки на холсте
			this.ball.width, this.ball.height);
		this.blocks.forEach(function(element){
			if (element.isAlive)
				this.ctx.drawImage(this.sprites.block, element.x, element.y);
		}, this);
	},

	// Метод запуска инструкций обновления данных каждый кадр
	update: function() {
		// Движение платформы
		if (this.paddle.dx) {
			this.paddle.move();
		}
		// Движение шара
		if (this.ball.dx || this.ball.dy) {
			this.ball.move();
		}

		// Столкновение с блоком
		this.blocks.forEach(function(e){
			if (e.isAlive) {
				if (this.ball.collide(e)) {
					this.ball.bumpBlock(e);
				}
			}
		}, this);

		// Столкновение с платформой
		if (this.ball.collide(this.paddle)) {
			this.ball.bumpPaddle(this.paddle);
		}

		this.ball.checkBounds();
	},

	// Метод запуска анимации
	run: function() {
		this.update();
		// Перерисовка изображения
		this.render();
		
		// Контроль частоты анимации кадров
		if (this.running) {
			window.requestAnimationFrame(function(){
				game.run();
			});
		}
	},

	// Конец игры
	over: function(msg) {
		alert(msg);
		this.running = false;
		window.location.reload();
	}

};

game.paddle.ball = game.ball;

// Запускаем программу при полной загрузки HTML страницы
window.addEventListener("load", function() {
	game.start();
});