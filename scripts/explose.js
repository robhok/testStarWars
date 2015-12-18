function drawGame() {
	particleManager.draw()
}

function refreshGame() {
	drawGame(), requestAnimFrame(function () {
		refreshGame();
	})
}

function faireBoum(n) {
	console.log('yo');
	particleManager.createExplosion(n.clientX - canvas.offsetLeft, n.clientY - canvas.offsetTop, sizeParam, areaParam, lifeParam, speedParam, gravityParam)
}
var speedParam = 100,
	sizeParam = 200,
	lifeParam = 300,
	areaParam = 400,
	gravityParam = 100,
	winHeight = window.innerHeight,
	winWidth = window.innerWidth,
	
	requestAnimFrame = function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || windows.oRequestAnimationFrame || window.msRequestAnimationFrame || function (n) {
			window.setTimeout(n, 1e3 / 60)
		}
	}(),
	canvas, ctx, particleManager, fireParticle;
window.addEventListener("load", function () {
	if (fireParticle = new Image, fireParticle.src = "imgs/fire2.png", canvas = document.querySelector(".canvas"), !canvas && canvas.getContext) return !1;
	
	ctx = canvas.getContext("2d"), canvas.addEventListener("click", faireBoum), particleManager = new ParticleManager(ctx), refreshGame()
}, !1)

function ParticleManager(n) {
	var t = [],
		i = n;
	this.draw = function () {
		for (var r = [], n = t.length - 1; n >= 0; n--) t[n].moves++, t[n].x += t[n].xunits, t[n].y += t[n].yunits + t[n].gravity * t[n].moves, t[n].moves < t[n].life && (r.push(t[n]), i.globalAlpha = 5 / t[n].moves, i.drawImage(fireParticle, Math.floor(t[n].x), Math.floor(t[n].y), t[n].width, t[n].height), i.globalAlpha = 1);
		t = r
	}, this.createExplosion = function (n, i, r, u, f, e, o) {
		var e, s, h;
		for (n = n - r * .5, i = i - r * .5, e = r * e * .01, s = 1; s < u; s++)
			for (h = 0; h < 10 * s; h++) t.push(particle(n, i, r, r, s * e, o, f))
	}
}
var particle = function (n, t, i, r, u, f, e) {
	var s = Math.floor(Math.random() * 360),
		o = s * Math.PI / 180;
	return {
		x: n,
		y: t,
		width: i,
		height: r,
		speed: u,
		life: e,
		gravity: f,
		xunits: Math.cos(o) * u,
		yunits: Math.sin(o) * u,
		moves: 0
	}
}