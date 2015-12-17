var globalVar = {};
globalVar.divShip = document.querySelector('.player_ship');
globalVar.playerShip = new playerShip();
globalVar.size = 5;
globalVar.divRoad = document.querySelector('.road');
globalVar.gameArray = [];

function init() {
	for (var i = 0; i < globalVar.size; i++) { 
		globalVar.gameArray[i] = new Array(globalVar.size);
	}
	globalVar.playerShip.init(globalVar.divShip, globalVar.divRoad, 0, 0);
	globalVar.playerShip.keyDetect(globalVar.divShip, globalVar.gameArray);
}

function spawn() {
	var x, y, z = 100;
	do {
		x = Math.round(globalVar.size*Math.random()) - 1;
		y = Math.round(globalVar.size*Math.random()) - 1;
	} while (globalVar.gameArray[x][y])
	globalVar.gameArray[x][y] = new enemyShip ();
	globalVar.gameArray[x][y].init(globalVar.gameArray, globalVar.divRoad, 2, x, y, z);
}

init();