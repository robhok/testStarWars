//(function () {
	function enemyShip () {};
	enemyShip.prototype = {
		init: function(array, road, type, x, y, z) {
			this.type = type;
			this.road = road;
			this.xArray = x;
			this.yArray = y;
			this.x = parseInt((this.xArray*100)/array.length);
			this.y = parseInt((this.yArray*100)/array.length);
			this.z = 100;
			this.ship = document.createElement('div');
			this.ship.style.left = this.x + "%";
			this.ship.style.bottom = this.z + "%";
			this.ship.style.transform = 'translateZ(' + this.y + 'px)';
			this.ship.className = "enemy-"+(type-1);
			this.road.appendChild(this.ship);
			this.health = this.type;
		},
		move: function () {
			console.log('move');
		},
		shoot: function () {
			console.log('move');
		},
		touched: function (shot, type) {
			shot.delete();
		},
		die: function () {
			console.log('move');
		}
	}
//}) ();