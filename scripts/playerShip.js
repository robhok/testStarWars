//(function () {
	function playerShip () {};
	playerShip.prototype = {
		init: function(divShip, divRoad, x, y) {
			this.ship = divShip;
			this.road = divRoad;
			this.x = x;1
			this.y = y;
			this.moving = 0;
			this.state = 1;
			this.health = 100;
			this.regenDelay = 10000; //10s
			this.incrMove = 2;
			this.incrY = 10;
			this.acceleration = 0;
			this.accelerationY = 0;
			this.incrAcceleration = 0.2;
			this.incrAccelerationY = 1;
			this.type = 1;
			this.keys = [];
			this.keys[16] = 0,
			this.keys[32] = 0,
			this.keys[37] = 0,
			this.keys[38] = 0,
			this.keys[39] = 0,
			this.keys[40] = 0;
			this.keys[0] = 0;
			this.keys[1] = 0;
			this.keys[2] = 0;
		},
		keyDetect: function (divShip, array) {
			var self = this;
			window.onkeydown = function(e) { //38, 40, 37, 39 = haut bas gauche droite
				e.preventDefault;
				var key = e.keyCode || e.which;
				if (self.keys[key] == 0 || self.keys[key] == 1) {
					self.keys[key] = 1;
					if (self.keys[38] && self.keys[37]) { var x = -1, y = 1; }
					else if (self.keys[38] && self.keys[39]) { var x = 1, y = 1; }
					else if (self.keys[40] && self.keys[37]) { var x = -1, y = -1; }
					else if (self.keys[40] && self.keys[39]) { var x = 1, y = -1; }
					else if (self.keys[38]) { var x = 0, y = 1; }
					else if (self.keys[40]) { var x = 0, y = -1; }
					else if (self.keys[37]) { var x = -1, y = 0; }
					else if (self.keys[39]) { var x = 1, y = 0; }
					if (self.keys[16]) { self.flip(self.moving, array); }
					else if (self.keys[32]) { self.shoot(self.type, array); }
					if (x || y) {
						/*if (x !== self.keys[1] || y !== self.keys[2]) {
							console.log(self.keys[0]);
							if (self.keys[0]) { clearInterval(self.keys[0]); self.keys[0] = 0; }
							self.keys[0] = setInterval(function () { self.move(divShip, x, y); }, 30);
							console.log(self.keys[0]);
							self.keys[1] = x;
							self.keys[2] = y;
						}*/
						self.move(divShip, x, y);
					}
				}
			}
			window.onkeyup = function(e) { //38, 40, 37, 39 = haut bas gauche droite
				e.preventDefault;
				var key = e.keyCode || e.which;
				switch(key) {
					case 38:
						self.decelerate(divShip, 0, 1);
						self.keys[key] = 0;
						/*self.keys[1] = 0;
						self.keys[2] = 0;
						if (self.keys[0]) { clearInterval(self.keys[0]); self.keys[0] = 0; }*/
						break;
					case 40:
						self.decelerate(divShip, 0, -1);
						self.keys[key] = 0;
						/*self.keys[1] = 0;
						self.keys[2] = 0;
						if (self.keys[0]) { clearInterval(self.keys[0]); self.keys[0] = 0; }*/
						break;
					case 37:
						self.decelerate(divShip, -1, 0);
						self.keys[key] = 0;
						/*self.keys[1] = 0;
						self.keys[2] = 0;
						if (self.keys[0]) { clearInterval(self.keys[0]); self.keys[0] = 0; }*/
						break;
					case 39:
						self.decelerate(divShip, 1, 0);
						self.keys[key] = 0;
						/*self.keys[1] = 0;
						self.keys[2] = 0;
						if (self.keys[0]) { clearInterval(self.keys[0]); self.keys[0] = 0; }*/
						break;
					case 32:
						self.keys[key] = 0;
						break;
					case 16:
						self.keys[key] = 0;
						break;
					default:
						break;
				}
			}
		},
		move: function (divShip, x, y) {
			if (this.acceleration == this.incrMove || this.acceleration == this.incrZ) {
				this.moving = 1;
				divShip.style.left = parseFloat(divShip.style.left) + (x * this.incrMove) + "%";
				divShip.style.transform = 'translateZ('+ (parseFloat(divShip.style.transform.split('(')[1]) + (y * this.incrY)) + 'px)';
				this.moving = 0;
			}
			else this.accelerate(divShip, x, y);
		},
		accelerate: function(divShip, x, y) {
			this.moving = 1;
			if (x != 0) { 
				if (this.acceleration + this.incrAcceleration < this.incrMove) this.acceleration += this.incrAcceleration;
				else this.acceleration = this.incrMove;
			}
			if (y != 0) {
				if (this.accelerationY + this.incrAccelerationY < this.incrY) this.accelerationY += this.incrAccelerationY;
				else this.accelerationY = this.incrY;
			}
			divShip.style.left = parseFloat(divShip.style.left) + (x * this.acceleration) + "%";
			divShip.style.transform = 'translateZ('+ (parseFloat(divShip.style.transform.split('(')[1]) + (y * this.accelerationY)) + 'px)';
			this.moving = 0;
		},
		decelerate: function(divShip, x, y) {
			if (this.acceleration > 0.1) this.acceleration = this.acceleration/2;
			else this.acceleration = 0;
			if (this.accelerationY > 0.1) this.accelerationY = this.accelerationY/2;
			else this.accelerationY = 0;
			divShip.style.left = parseFloat(divShip.style.left) + (x * this.acceleration) + "%";
			divShip.style.transform = 'translateZ('+ (parseFloat(divShip.style.transform.split('(')[1]) + (y * this.accelerationY)) + 'px)';
			if (this.acceleration != 0) this.decelerate(divShip, x, y); //mettre un set interval dans le keyup à la place
		},
		shoot: function (type, array) {
			var shotX = parseInt(this.ship.style.left);
			var shotY = parseFloat(this.ship.style.transform.split('(')[1]);
			var shotZ = parseInt(this.ship.style.bottom);
			var shotTest = new Shot();
			shotTest.init(this.ship, this.road, shotX, shotY, shotZ, this.type, array);
			shotTest.checkLine(array);
			shotTest.moveCall(array);
		},
		flip: function (state, array) {
			if (state == 1) console.log('flip');
		},
		touched: function (type) {
			var self = this;
			switch(type) {
				case 2:
					self.health -= 5;
					break;
				case 3:
					self.health -= 10;
					break;
				case 4:
					self.health -= 15;
					break;
				case 5:
					self.health -= 20;
					break;
				case 6:
					self.health -= 30;
					break;
				default:
					break;
			}
			if(self.health < 1) self.die();
		},
		regenHealth: function () {
			var self = this;
			setInterval(function() { self.health += 5 }, this.regenDelay);
		},
		explose: function() {
			console.log('explose');
		},
		die: function () {
			this.explose();
		}
	}
//}) ();