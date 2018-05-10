/* Скрипт */
"use strict";

// === Приложение ====================
var kramala = {

	delta: undefined,
	ctx: undefined,

	sprites: {
		ship: undefined
	},

	ship: {
		w: 343,
		h: 383,
		x: canvas.width / 2,
		y: canvas.height * 0.9,
		scale: 0.2
	},

	Init: function() {

		var canvas = document.getElementById("canvas");
		this.ctx = canvas.getContext("2d");

		window.addEventListener("touchstart", HandleStart, false);
		window.addEventListener("touchmove", HandleMove, false);
		window.addEventListener("touchend", HandleEnd, false);
	},

	Load: function() {
		for (var key in this.sprites) {
			this.sprites[key] = new Image();
			this.sprites[key].src = "img/" + key + ".png";
		}
	},

	Render: function() {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);

		this.ctx.drawImage(this.sprites.ship, 
			0, 0, this.ship.w, this.ship.h, 
			this.ship.x - (this.ship.w * this.ship.scale / 2), 
			this.ship.y - (this.ship.y * this.ship.scale / 2), 
			this.ship.w * this.ship.scale, this.ship.h * this.ship.scale);
		
		//this.ctx.drawImage(this.sprites.ship, this.ship.x, this.ship.y); 
	},

	Update: function() {
		
	},

	Run: function(time) {
		this.delta = (performance.now() - time).toFixed(3);
		this.Update();
		this.Render();
		window.requestAnimationFrame(function(time) {
			kramala.Run(time);
		});
	},

	Start: function() {
		this.Init();
		this.Load();
		this.Run();
	}

}

// === Слушатели касания экрана ======
function HandleStart(e) { 
	//e.preventDefault();
	Handle(e.changedTouches[0]);
}
function HandleMove(e) { 
	//e.preventDefault();
	Handle(e.changedTouches[0]);
}
function HandleEnd(e) { 
	//e.preventDefault();
	Handle(e.changedTouches[0]);
}
function Handle(finger) {
	console.log(finger.clientX + " " + finger.clientY)
}
// ===================================

// === Вспомогательные объекты =======
function Point(x, y) {
	this.x = undefined;
	this.y = undefined;
}

Point.prototype.setPoint = function(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.getPoint = function() {
	return { x: this.x, y: this.y };
}
// ===================================

// === Запуск программы ==============
window.addEventListener("load", function(){
	kramala.Start();
});