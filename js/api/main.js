/*global console, $*/
function randomIntFromInterval(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var snakeProp = {
	snakeScore : 0,
	snakeState : -1, //0 for stopped and 1 for moving
	snakeBody : [],
	snakeHead : null,
	snakeSpeed : 10,
	snakeTimer : null
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

var obstaclesArr = [];

var canvasObj = document.getElementById("canvasElem");
var height = canvasObj.height;
var width = canvasObj.width;
var canvasContext = null;
if (canvasObj.getContext) {
	canvasContext = canvasObj.getContext('2d');
	canvasContext.fillStyle = "rgb(255, 255, 255)";
	canvasContext.clearRect(0, 0, width, height);
}

function pointForSnakeOrFood(x, y) {
	"use strict";
	var i = 0;
	if (x === food.x && y === food.y) {
		return true;
	}
	for (i = 0; i < snakeProp.snakeBody.length; i += 1) {
		if (snakeProp.snakeBody[i].xPosition === x && snakeProp.snakeBody[i].yPosition === y) {
			return true;
		}
	}
	
	for (i = 0; i < obstaclesArr.length; i += 1) {
		if (obstaclesArr[i].x === x && obstaclesArr[i].y === y) {
			return true;
		}
	}
	return false;
}

function createObstacles() {
	"use strict";
	canvasContext.fillStyle = "rgb(255, 255, 255)";
	var x, y, count = 0;
	
	while (count < 3) {
		x = randomIntFromInterval(1, width - 1);
		y = randomIntFromInterval(1, height - 1);
		if (!pointForSnakeOrFood(x, y)) {
			switch (count) {
			case 0:
				obstaclesArr.push({"x" : x, "y" : y, "width" : 2, "height" : 80});
				canvasContext.fillRect(x, y, 2, 80);
				break;
			case 1:
				obstaclesArr.push({"x" : x, "y" : y, "width" : 8, "height" : 20});
				canvasContext.fillRect(x, y, 8, 20);
				break;
			case 2:
				obstaclesArr.push({"x" : x, "y" : y, "width" : 80, "height" : 80});
				canvasContext.fillRect(x, y, 80, 80);
				break;
			}
			
			count += 1;
		}
	}
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
    canvasContext.clearRect(0, 0, width, height);
    
	food.x = randomIntFromInterval(1, width - 1);
    food.y = randomIntFromInterval(1, height - 1);
	canvasContext.fillStyle = "rgb(255, 255, 0)";
	canvasContext.fillRect(food.x, food.y, 8, 8);
	
	createObstacles();
}