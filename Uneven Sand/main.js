var canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var c = canvas.getContext('2d');

var mouse = {
	y: undefined,
	x: undefined
}

window.addEventListener('mousemove', 
	function(event) {
		mouse.x = event.x;
		mouse.y = event.y;
		console.log(mouse); 
	}
);

window.addEventListener('resize', 
	function() {
		canvas.height = window.innerHeight;
		canvas.width = window.innerWidth;
	}
);

function Bar(x, width, height) {
	this.x = x;
	this.width = width;
	this.height = height;
	this.y = window.innerHeight - this.height;
	this.color = 'pink'; //Pull something from a random color array later

	this.draw = function() {
		c.fillRect(this.x, this.y, this.width, this.height);
		c.fillStyle = this.color;
	}

	this.update = function() {
		if (mouse.y < this.y) {
			this.y -= 2;
			this.height += 2;
		}

		if (mouse.y > this.y) {
			this.y += 2; 
			this.height -= 2; 
		}

		this.draw();
	}
}

var width = 100;
var startPosition = (window.innerWidth % width)/2;
var rectangleArray = [];

for (var i = 0; i < window.innerWidth/width-1; i++) {
	var height = Math.random() * window.innerHeight;
	rectangleArray.push(new Bar(startPosition, width, height));
	startPosition += width; 
}

function animate() {
	requestAnimationFrame(animate);
	
	c.clearRect(0, 0, window.innerWidth, window.innerHeight);	
	for (var i = 0; i < rectangleArray.length; i++) {
		rectangleArray[i].update();
	}
}

animate();