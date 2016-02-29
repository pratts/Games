var snake = {
	snakeBody : [],
	snakeHead : null,
};

var game = {
    score : 0,
    timer : null,
    speed : 10,
    state : -1  //0 for stopped and 1 for moving
};

var SnakeObj = function (xPosition, yPosition, direction, width) {
	"use strict";
	this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.direction = direction;
    this.width = width;
};

var food = {
    x : 0,
    y : 0
};

var obstaclesArr = [];

var canvasObj = document.getElementById("canvasElem");
var height = canvasObj.height;
var width = canvasObj.width;