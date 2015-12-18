//(function () {
function enemyShip() {};
enemyShip.prototype = {
		init: function (array, road, type, x, y, z) {
			this.type = type;
			this.road = road;
			this.xArray = x;
			this.yArray = y;
			this.x = parseInt((this.xArray * 100) / array.length);
			this.y = parseInt((this.yArray * 300) / array.length);
			this.z = 500;
			this.ship = document.createElement('div');
			this.ship.style.left = this.x + "%";
			this.ship.style.bottom = this.z + "%";
			this.ship.style.transform = 'translateZ(' + this.y + 'px) rotateX(-80deg)';
			this.ship.className = "enemy-" + (type - 1);
			this.road.appendChild(this.ship);
			this.health = this.type * this.type;
			this.intervMove = 0;
		},
		move: function (array, divPlayerShip, playerShip) {
			var self = this;
			self.intervMove = setInterval(function () {
				self.z -= 1;
				self.ship.style.bottom = self.z + "%";
				switch (self.z) {
				case -30:
					if (self) self.delete();
					break;
				case 4:
					if (array[self.xArray][self.yArray]) {
						playerShip.touched(self.type);
						array[self.xArray][self.yArray] = 0;
					}
					console.log('tete');
					break;
				default:
					break;
				}
			}, 30);
		},
		touched: function (shot, type, array) {
			this.health -= shot.type * 10;
			if (this.health < 1) this.die(array);
		},
		explose: function () {
			console.log('explose');
		},
		delete: function () {
			this.road.removeChild(this.ship);
		},
		die: function (array) {
			if (array[this.xArray][this.yArray]) {
				array[this.xArray][this.yArray] = 0;
				this.delete();
				this.explose();
			}
		}
	}
	//}) ();