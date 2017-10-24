var canvas = document.querySelector('canvas'); 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove', 
	function(event) {
		mouse.x = event.x;
		mouse.y = event.y;
});

window.addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight; 
});

colors = ['pink', 'purple', 'gold'];

function Circle(x, y, dx, dy, radius) { //this is a class
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = colors[Math.floor(Math.random() * 3)];
	var mouseRange = 50;

	this.draw = function() {
		c.beginPath(); 
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = 'firebrick';
		c.stroke();
		c.fill();
		c.fillStyle = this.color;
	}

	this.update = function() {
		if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
			this.dx = -(this.dx);}

		if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
			this.dy = -(this.dy); }

		this.x += this.dx;
		this.y += this.dy; 

		if (this.x - mouse.x < mouseRange && this.x - mouse.x > - mouseRange &&
			this.y - mouse.y < mouseRange && this.y - mouse.y > -mouseRange) {
			if (this.radius < 50) {
				this.radius += 5
			}
		} else if (this.radius > 5) {
			this.radius -= 5;
		}

		this.draw(); //Plot the updated circle onto the canvas
	}
}

var circle = new Circle(80, 80, 5, 5, 10);
var circleArray = [];

for (var i = 0; i < 600; i++) {
	var dx = (Math.random() - 0.5) * 5;
	var dy = (Math.random() - 0.5) * 5;
	var radius = Math.random()*50;
	var x = Math.floor(Math.random()*(window.innerWidth-175)+100);
	var y = Math.floor(Math.random()*(window.innerHeight-175)+100); 
	circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, window.innerWidth, window.innerHeight)

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}	
}

animate();