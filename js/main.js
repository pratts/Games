/*global console, $*/
function randomIntFromInterval(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var snakeProp = {
	snakeScore : 0,
	snakeState : -1, //0 for stopped and 1 for moving
	lengthBody : 1,
	snakeBody : [],
	snakeHead : null,
	snakeSpeed : 10
};

var SnakeObj = function (xPosition, yPosition, direction) {
	"use strict";
	this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.direction = direction;
};

var food = {
    x : 0,
    y : 0
};

var canvasObj = document.getElementById("canvasElem");
var canvasContext = null;
if (canvasObj.getContext) {
	canvasContext = canvasObj.getContext('2d');
	canvasContext.fillStyle = "rgb(255, 255, 255)";
	canvasContext.clearRect(0, 0, canvasObj.width, canvasObj.height);
}

function createSnakeAndFood() {
	"use strict";
	snakeProp.snakeBody = [];
	var i = 0, sk = null;
	while (i < 30) {
		sk = new SnakeObj(i, 0, "moveRight");
		snakeProp.snakeBody.push(sk);
		i = i + 1;
	}
	snakeProp.snakeHead = new SnakeObj(i - 1, 0, "moveRight");
    canvasContext.clearRect(0, 0, canvasObj.width, canvasObj.height);
    food.x = randomIntFromInterval(1, canvasObj.width - 1);
    food.y = randomIntFromInterval(1, canvasObj.height - 1);
}