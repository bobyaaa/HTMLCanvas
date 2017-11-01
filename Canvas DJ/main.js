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
	}
);

//Not really working right now, but I do know the problem...
//We need to make sure that we completely erase the array first before remaking
//the elements!!
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
	this.color1 = 30;
	this.color2 = String(Math.floor(Math.random()*140)+100);
	this.color3 = 30;
	this.cx1 = 1;

	this.draw = function() {
		c.fillRect(this.x, this.y, this.width, this.height);
		c.fillStyle = this.color;
		this.color = 'rgb(' + this.color1 + ',' + this.color2 + ',' + this.color3 + ')';

	}

	this.update = function() {
		if (Math.abs(mouse.x - this.x) < 150) {
			if (mouse.y < this.y) {
				this.y -= 2.5;
				this.height += 2.5;
			}

			if (mouse.y > this.y) {
				this.y += 2.5; 
				this.height -= 2.5; 
			}
		}	

		var isDouble = Math.floor(Math.random()*2); 

		if (this.color1 > 200 || this.color1 < 20) {
			(isDouble) ? this.cx1 = -2*this.cx1 : -this.cx1; //The 2* is gonna destroy this thing.
		}

		this.color1 += this.cx1; 

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

var counter = 0;
function animate() {
	requestAnimationFrame(animate);
	
	c.clearRect(0, 0, window.innerWidth, window.innerHeight);	
	for (var i = 0; i < rectangleArray.length; i++) {
		rectangleArray[i].update();
	}

	counter++;
	if (counter > 300) {
		c.font = "70px Arial";
		c.fillText("Andrew Xing.",window.innerWidth/2-200,window.innerHeight/2);
		c.font = "30px Arial";
		c.fillText("Professional Web Dev. (Haha)", window.innerWidth/2 - 100, window.innerHeight/2 + 70); 	
	}

}

animate();