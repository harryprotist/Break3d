var Blocks = function(game, width, height) {

	this.rows = 15;
	this.columns = 11;
	this.width = width;
	this.height = height;

	this.game = game;

	this.colors = [0xff0000, 0xffff00, 0xff00ff, 0x00ffff, 0x0000ff, 0x00ff00];
	this.blocks = new Array(this.rows * this.columns);
	this.destroyed = new Array(this.rows * this.columns);
}

Blocks.prototype.init = function() {

	for (var i = 0; i < this.blocks.length; i++) {

		this.destroyed[i] = false
		
		var color = this.colors[(Math.random()*this.colors.length) | 0];
		var material = new THREE.MeshLambertMaterial({
			color: color
		});
		var geometry = new THREE.BoxGeometry(1.9,2,1.9);
		var box = new THREE.Mesh(geometry, material);
		box.position.x = (i % 11) * 2 - this.width / 2;
		box.position.z = Math.floor(i / 11) * 2 - this.height / 2 + 1;
		box.position.y = 1;

		this.game.scene.add(box);
		this.blocks[i] = box;
	}
}

Blocks.prototype.update = function() {
	
	for (var i = 0; i < this.blocks.length; i++) {

		if(this.destroyed[i] !== false) {
			this.blocks[i].position.y -= 0.15;
			if (this.blocks[i].position.y < -1) {
				this.game.scene.remove(this.blocks[i]);
				this.blocks.splice(i, 1);
				this.destroyed.splice(i, 1);
			}
		} 
		else if (this.game.ball.collide_block(this.blocks[i])) {
			this.destroyed[i] = true;
			return true;
		}
	}	
	return false;
}
