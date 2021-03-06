var obstaclesArr = [];

var canvasObj = document.getElementById("canvasElem");
var height = canvasObj.height;
var width = canvasObj.width;
var canvasContext = null;
if (canvasObj.getContext) {
	canvasContext = canvasObj.getContext('2d');
}

var snake = {
	snakeBody : [],
	snakeHead : null
};

var game = {
    score : 0,
    timer : null,
    speed : 10,
    state : -1  //0 for stopped and 1 for moving
};

var SnakeObj = function (xPosition, yPosition, direction, width, height) {
	"use strict";
	this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.direction = direction;
    this.width = width;
	this.height = height;
};

var food = {
    xPosition : 0,
    yPosition : 0,
	width : 8,
	height : 8
};

var initialize = {
	initializeSnake : function (tempSnake) {
		"use strict";
		snake.snakeBody = tempSnake.snakeBody;
		snake.snakeHead = tempSnake.snakeHead;
	},
	initializeFood : function (tempFood) {
		"use strict";
		food.xPosition = tempFood.xPosition;
		food.yPosition = tempFood.yPosition;
		food.width = tempFood.width;
		food.height = tempFood.height;
	},
	initializeObstacles : function (tempObs) {
		"use strict";
		obstaclesArr = tempObs;
	}
};