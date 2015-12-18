var globalVar = {};
globalVar.divShip = document.querySelector('.player_ship');
globalVar.playerShip = new playerShip();
globalVar.size = 10;
globalVar.divRoad = document.querySelector('.road');
globalVar.gameArray = [];
globalVar.maxEnemys = globalVar.size;
globalVar.enemys = 0;
globalVar.canvas = document.querySelector('canvas');
globalVar.context = globalVar.canvas.getContext('2d');
globalVar.width = window.innerWidth;
globalVar.height = window.innerHeight;
globalVar.canvas.width = globalVar.width;
globalVar.canvas.height = globalVar.height;

function init() {
	for (var i = 0; i < globalVar.size; i++) {
		globalVar.gameArray[i] = new Array(globalVar.size);
	}
	globalVar.playerShip.init(globalVar.divShip, globalVar.divRoad, 0, 0);
	globalVar.playerShip.keyDetect(globalVar.divShip, globalVar.gameArray);
}

function spawn() {
	var x = 0,
		y,
		z = 100;
	do {
		y = Math.ceil(globalVar.size * Math.random()) - 1;
		if (!globalVar.gameArray[x][y]) {
			globalVar.gameArray[x][y] = new enemyShip();
			globalVar.gameArray[x][y].init(globalVar.gameArray, globalVar.divRoad, 2, x, y, z);
			globalVar.gameArray[x][y].move(globalVar.gameArray, globalVar.divShip, globalVar.playerShip);
			globalVar.enemys++;
			x = (x + 1) % globalVar.size;
		}
	} while (globalVar.gameArray[x][y] || globalVar.enemys < globalVar.maxEnemys);
}

function background () {
	globalVar.context.beginPath();
	globalVar.context.fillStyle = "#000000";
	globalVar.context.fillRect(0, 0, globalVar.width, globalVar.height);
	globalVar.context.closePath();
}

function randomDirection () {
	var dir = {};
	dir.x = Math.floor(Math.random() * 2);
	if (!dir.x) dir.y = Math.floor(Math.random()*globalVar.height);
	else {
		dir.y = 0;
		dir.x = Math.floor(Math.random()*globalVar.width);
	}
	return dir;
}

init();
spawn();
background();

function particle () {};
particle.prototype = {
	init: function(dir) {
		this.mid = {
			x: globalVar.width/2,
			y: globalVar.height/2
		}
		this.dir = dir;
		this.incr = 1;
		this.percent = {
			x: (this.mid.x - this.dir.x)/100,
			y: (this.mid.y - this.dir.y)/100
		}
	},
	move: function() {
		if (this.incr < 110) {
			var beginX = this.mid.x + (this.percent.x*this.incr),
			beginY = this.mid.y + (this.percent.y*this.incr),
			newX = this.mid.x + (2*this.percent.x*this.incr),
			newY = this.mid.y + (2*this.percent.y*this.incr);
			var beginX2 = this.mid.x - (this.percent.x*this.incr),
			beginY2 = this.mid.y - (this.percent.y*this.incr),
			newX2 = this.mid.x - (2*this.percent.x*this.incr),
			newY2 = this.mid.y - (2*this.percent.y*this.incr);
			globalVar.context.beginPath();
			globalVar.context.moveTo(beginX, beginY);
			globalVar.context.lineTo(newX, newY);
			globalVar.context.moveTo(beginX2, beginY2);
			globalVar.context.lineTo(newX2, newY2);
			globalVar.context.lineWidth = 0.5 + (this.incr/100);
			globalVar.context.strokeStyle = "#ffffff";
			globalVar.context.lineCap = 'round';
			globalVar.context.stroke();
			globalVar.context.closePath();
			this.incr++;
		}
	}
}
var particles = [],
	incr = 0;

setInterval(function () { 
	var dir = randomDirection();
	particles[incr] = new particle ();
	particles[incr].init(dir);
	incr = (incr+1)%50;
}, 200);

setInterval(function () { 
	background();
	for (var i = 0; i < particles.length; i++) particles[i].move();
}, 50);
