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

var food = {"x": 0, "y": 0};