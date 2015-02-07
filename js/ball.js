var Ball = function(game, width, height) {

	this.game = game;
	this.width = width;
	this.height = height;
	
	var geometry = new THREE.SphereGeometry(1);
	var material = new THREE.MeshLambertMaterial({color: 0xD43001});

	this.sphere = new THREE.Mesh(geometry, material);
	this.sphere.position.y = 1;

	this.game.scene.add(this.sphere);

	this.vx = -0.3
	this.vz = -0.3;
}

Ball.prototype.random_add = function() {
	
	if (this.vx > 0.3 || this.vy > 0.3) {
		return Math.random() * 0.1;
	} else {
		return -Math.random() * 0.1;
	}
}

Ball.prototype.update = function() {

	this.sphere.position.x += this.vx;
	this.sphere.position.z += this.vz;

	/* don't bounce if it heads towards the player */
	if (this.sphere.position.z < -this.height / 2) {
		this.sphere.position.z = -this.height / 2;
		this.vz = -this.vz + this.random_add();
	}

	if (Math.abs(this.sphere.position.x) > this.width / 2) {
		this.sphere.position.x = this.width / 2 * ((this.sphere.position.x < 0)? -1:1);
		this.vx = -this.vx + this.random_add();
	}
}

Ball.prototype.collide = function(paddle_x, paddle_width) {
	
	if (this.sphere.position.z > this.height / 2) {
		if (Math.abs(paddle_x - this.sphere.position.x) < paddle_width / 2 + 2) {
			this.sphere.position.z = this.height / 2;
			this.vz = -this.vz + this.random_add();
		} else {
			this.game.lose = true;
		}
	}
}
