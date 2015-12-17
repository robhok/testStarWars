//(function () {
	function Shot () {};
	Shot.prototype = {
		init: function(element, divRoad, x, y, z, type, array) {
			this.array = array;
			this.road = divRoad;
			this.x = x;
			this.y = y;
			this.z = z;
			this.ship = element;
			this.type = type; //type du vaisseau, 1 = allié, 2 - 3 - 4 - 5 = ennemis, 6 = boss
			this.incr = 2;
			this.divShot = document.createElement('div');
			this.divShot.style.left = x + "%";
			this.divShot.style.bottom = z + "%";
			this.divShot.style.transform = 'translateZ(' + y + 'px)';
			this.divShot.className = "laser";
			this.road.appendChild(this.divShot);
			this.xArray = parseInt((x*array.length)/100);
			this.yArray = parseInt((y*array.length)/100);
			this.intervMove = 0;
			this.intervDelay = 20;
			this.maxZ = 120;
		},
		detectTarget: function(x, y, array) {
			if(array[x][y]) return 1;
		},
		checkLine: function(array) {
			this.touch = this.detectTarget(this.xArray, this.yArray, array);
			if (this.touch) this.maxZ = parseInt(array[this.xArray][this.yArray].ship.style.bottom);
		},
		moveCall: function(array) {
			var self = this;
			this.intervMove = setInterval(function() { self.moveTo(array); }, this.intervDelay);
		},
		moveTo: function(array) {
			if (parseInt(this.divShot.style.bottom) < this.maxZ) this.divShot.style.bottom = (parseInt(this.divShot.style.bottom) + this.incr) + "%";
			else this.arrived(array[this.xArray][this.yArray]);
		},
		arrived: function(ship) {
			if (this.touch) ship.touched(this, this.type);
			clearInterval(this.intervMove);
		},
		delete: function() {
			this.road.removeChild(this.divShot);
		}
	}
//}) ();