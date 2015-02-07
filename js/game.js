var WIDTH  = 640;
var HEIGHT = 480;

var Game = function() {

	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(
		75, // FOV
		WIDTH / HEIGHT, // aspect
		0.1, // close
		1000 // far
	);	

	this.renderer = new THREE.WebGLRenderer();	

	this.ball = new Ball(this, 20, 40);

	this.paddle = new Paddle(this, 20, 42);

	this.lose = false; // set by ball if lose condition occurs
	this.pause = false;
	this.keys = new Array(256);
}

Game.prototype.update = function() {
	
	if (this.lose || this.pause) {
		return
	}

	this.ball.update();
	this.paddle.update();
	this.ball.collide(this.paddle.box.position.x, 4);
}

Game.prototype.init = function() {
		
	var ref = this;
	document.addEventListener("keydown", function(e) {
		ref.keys[e.keyCode] = true;	
	});
	document.addEventListener("keyup", function(e) {
		if (e.keyCode === 32) {
			ref.pause = !ref.pause;
		}

		ref.keys[e.keyCode] = false;	
	});

	this.renderer.setSize(WIDTH, HEIGHT);
	document.getElementById("main").appendChild(this.renderer.domElement);


	// set the scene 

	var plane_material = new THREE.MeshLambertMaterial({color: 0x55ff55});
	var plane_geometry = new THREE.PlaneGeometry(22, 42, 1, 1);
	this.plane = new THREE.Mesh(plane_geometry, plane_material);
	this.plane.rotation.x = -Math.PI / 2;
	this.scene.add(this.plane);

	var light = new THREE.PointLight(0xffffff, 1, 100);
	light.position.set(25, 25, 25);
	this.scene.add(light);
	
	this.camera.position.z = 23;
	this.camera.position.y = 13;
	this.camera.rotation.x = -Math.PI / 4;
}

Game.prototype.start = function() {

	var vx = -0.2;
	var vz = -0.2;
	
	var game = this;
	var render = function() {
		requestAnimationFrame(render);
		game.renderer.render(game.scene, game.camera);
	
		game.update();
	}
	render();
}

window.onload = function() {

	var g = new Game();
	g.init();
	g.start();
}
