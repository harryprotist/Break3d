var Paddle = function(game, width, height) {
	
	this.game = game;
	this.width = width;	

	var geometry = new THREE.BoxGeometry(4, 2, 1);
	var material = new THREE.MeshLambertMaterial({color: 0xffff55});
	this.box = new THREE.Mesh(geometry, material);
	this.box.position.z = height / 2;
	this.box.position.y = 1;

	this.game.scene.add(this.box);

	this.speed = 0.2;
}

Paddle.prototype.update = function() {
	
	var a_down = this.game.keys[65] || false;
	var d_down = this.game.keys[68] || false;

	if (this.box.position.x < this.width / 2) {
		this.box.position.x += d_down * this.speed;
	} if (this.box.position.x > -this.width / 2) {
		this.box.position.x -= a_down * this.speed;
	}
}
