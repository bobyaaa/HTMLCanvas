var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

/*/////////////// Mouse Event Handler /////////////////////*/
mouse = {
	x: undefined,
	y: undefined }
window.addEventListener('mousemove', function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
	console.log(mouse.x, mouse.y); 
});

/*//////////////// Circle Class //////////////////*/

function Circle(x, y, dx, dy, radius, dr) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.initialRadius = radius;

	this.draw = function() {
		//Basically just draw the object on the canvas
		//Update this later so we don't get plain circles
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.stroke();
	}

	this.update = function() {
		//Updates position, makes radius smaller
		//If the circle radius is negative, we just reset it
		//Make circles bounce off walls (?) .. Later
		this.x += dx;
		this.y += dy;
		this.radius -= dr; 

		if (this.radius <= 0) {
			this.x = mouse.x;
			this.y = mouse.y;
			this.radius = this.initialRadius; 
			console.log(this.initialRadius); 
		}
		this.draw();
	}
}

var circ = [];

for (var i = 0; i < 12; i++) {
	var dx = (Math.random() - 0.5) * 1.2;
	var dy = (Math.random() - 0.5) * 1.2;
	var radius = 13;
	var dr = (Math.random() + 0.5) * 0.5;
	circ.push(new Circle(-100, -100, dx, dy, radius, dr));
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, window.innerWidth, window.innerHeight);

	for (var i = 0; i < 12; i++) {
		circ[i].update(); 
	}
}

animate();