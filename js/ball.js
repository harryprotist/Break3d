var Ball = function(game, width, height) {

	this.game = game;
	this.width = width;
	this.height = height;
	
	var geometry = new THREE.SphereGeometry(1);
	var material = new THREE.MeshLambertMaterial({color: 0xD43001});

	this.sphere = new THREE.Mesh(geometry, material);
	this.sphere.position.y = 1;
	this.sphere.position.z = 15;

	this.game.scene.add(this.sphere);

	this.vx = Math.random() * 2; 
	this.vz = -1;
	this.speed = 0.3;
	this.set_to_speed();
}

Ball.prototype.random_add = function() {
	
	if (this.vx > 0.3 || this.vy > 0.3) {
		return Math.random() * 0.15;
	} else {
		return -Math.random() * 0.15;
	}
}

Ball.prototype.set_to_speed = function() {
	var magnitude = Math.sqrt(this.vx*this.vx + this.vz*this.vz);
	this.vx = this.speed * (this.vx / magnitude);
	this.vz = this.speed * (this.vz / magnitude);
}
Ball.prototype.swap_z = function() {
	this.vz = -this.vz + this.random_add();
	this.set_to_speed();
}
Ball.prototype.swap_x = function() {
	this.vx = -this.vx + this.random_add();
	this.set_to_speed();
}

Ball.prototype.update = function() {

	this.sphere.position.x += this.vx;
	this.sphere.position.z += this.vz;

	/* don't bounce if it heads towards the player */
	if (this.sphere.position.z < -this.height / 2) {
		this.sphere.position.z = -this.height / 2;
		this.swap_z();
	}

	if (Math.abs(this.sphere.position.x) > this.width / 2) {
		this.sphere.position.x = this.width / 2 * ((this.sphere.position.x < 0)? -1:1);
		this.swap_x();
	}
}

Ball.prototype.collide_paddle = function(paddle_x, paddle_width) {
	
	if (this.sphere.position.z > this.height / 2) {
		if (Math.abs(paddle_x - this.sphere.position.x) < paddle_width / 2 + 2) {
			this.sphere.position.z = this.height / 2;
			this.swap_z();
			return true;
		} else {
			this.game.lose = true;
		}
	}
	return false;
}

Ball.prototype.collide_block = function(block) {
	
	var x = block.position.x;
	var z = block.position.z;
	var mx = this.sphere.position.x;
	var mz = this.sphere.position.z;

	if (Math.abs(x - mx) <= 2 && Math.abs(z - mz) <= 2) {

		if (Math.abs(x - mx) < Math.abs(z - mz)) {
			this.swap_z();
		} else {
			this.swap_x();
		}
		return true;
	}
	return false;
}
