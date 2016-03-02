/*global SnakeObj*/
var controller = {
	randomIntFromInterval : function (min, max) {
		"use strict";
		return Math.floor(Math.random() * (max - min + 1) + min);
	},
    createSnakeAndFood : function (snakeProp) {
        "use strict";
		var snake = {}, i = 0, sk = null;
        snake.snakeBody = [];
        while (i < 30) {
            sk = new SnakeObj(i, 0, "moveRight");
            snake.snakeBody.push(sk);
            i = i + 1;
        }
        snake.snakeHead = new SnakeObj(i - 1, 0, "moveRight");
		return snake;
    },
	createFood : function (width, height) {
		"use strict";
		var foodPoint = {};
		foodPoint.x = controller.randomIntFromInterval(1, width - 1);
		foodPoint.y = controller.randomIntFromInterval(1, height - 1);
		return foodPoint;
	},
	pointForSnakeOrFood : function (x, y, food, snakeBody, obstaclesArr) {
		"use strict";
		var i = 0;
		if (x === food.x && y === food.y) {
			return true;
		}
		for (i = 0; i < snakeBody.length; i += 1) {
			if (snakeBody[i].xPosition === x && snakeBody[i].yPosition === y) {
				return true;
			}
		}

		for (i = 0; i < obstaclesArr.length; i += 1) {
			if (obstaclesArr[i].x === x && obstaclesArr[i].y === y) {
				return true;
			}
		}
		return false;
	},
	createObstacles : function (width, height) {
		"use strict";
		controller.changeCanvasStyle("rgb(255, 255, 255)");
		var x, y, count = 0, obstaclesAr;

		while (count < 3) {
			x = controller.randomIntFromInterval(1, width - 1);
			y = controller.randomIntFromInterval(1, height - 1);
			if (!controller.pointForSnakeOrFood(x, y)) {
				switch (count) {
				case 0:
					obstaclesAr.push({"x" : x, "y" : y, "width" : 2, "height" : 80});
					break;
				case 1:
					obstaclesAr.push({"x" : x, "y" : y, "width" : 8, "height" : 20});
					break;
				case 2:
					obstaclesAr.push({"x" : x, "y" : y, "width" : 80, "height" : 80});
					break;
				}
				count += 1;
			}
		}
		return obstaclesAr;
	}
};

var validations = {
	validateHead : function (snakeHead, width, height) {
		"use strict";
		return ((snakeHead.xPosition <= width) && (snakeHead.yPosition <= height) && (snakeHead.xPosition >= 0) && (snakeHead.yPosition >= 0));
	},
	
	validateHeadAndBody : function (snake, snakeHead) {
		"use strict";
		return (snake.xPosition === snakeHead.xPosition && snake.yPosition === snakeHead.yPosition);
	},
	
	validateHeadAndFood : function (snakeHead, food) {
		"use strict";
		return !(((snakeHead.xPosition + 8) < food.x) || (snakeHead.xPosition > (food.x + 8)) || ((snakeHead.yPosition + 8) < food.y) || (snakeHead.yPosition > (food.y + 8)));
	},
	
	validateHeadAndObstacle : function (obstaclesArr, snakeHead) {
		"use strict";
		var i, obstacle;
		for (i = 0; i < obstaclesArr.length; i += 1) {
			obstacle = obstaclesArr[i];
			if (!(((snakeHead.xPosition + 8) < obstacle.x) || (snakeHead.xPosition > (obstacle.x + obstacle.width)) || ((snakeHead.yPosition + 8) < obstacle.y) || (snakeHead.yPosition > (obstacle.y + obstacle.height)))) {
				return true;
			}
		}
		return false;
	},
	validateSnakePosition : function (snakeBody) {
		"use strict";
		var snakeHead = snakeBody[snakeBody.length - 1], i = null, snake = null;

		if (validations.validateHead(snakeHead) && !validations.validateHeadAndObstacle()) {
			i = snakeBody.length - 2;
			snake = null;
			while (i > 0) {
				snake = snakeBody[i];
				if (validations.validateHead(snake)) {
					if (validations.validateHeadAndBody(snake, snakeHead)) {
						return false;
					}
					i = i - 1;
				}
			}
			return true;
		} else {
			return false;
		}
	}
};

var canvasOps = {
	clearCanvas: function (canvasContext, width, height) {
		"use strict";
        canvasContext.clearRect(0, 0, width, height);
    },
	changeCanvasStyle : function (canvasContext, colorStr) {
		"use strict";
		canvasContext.fillStyle = colorStr;
	},
	fillRect : function (canvasContext, point, colorStr) {
		"use strict";
		canvasContext.fillRect(point.xPosition, point.yPosition, point.width, point.height);
	}
};

var game = {
	startSnake : function () {
		"use strict";
	},
	pauseSnake : function () {
		"use strict";
	},
	resetSnake: function () {
		"use strict";
	},
	function resetAll() {
		"use strict";
		snakeProp.snakeState = -1;
		snakeProp.snakeScore = 0;
		snakeProp.snakeBody = [];
		snakeProp.snakeHead = null;
		snakeProp.snakeSpeed = 10;
		obstaclesArr.length = 0;
		clearInterval(snakeProp.snakeTimer);
		canvasContext.clearRect(0, 0, width, height);
		canvasContext.fillText("GAME OVER !", (width - 65) / 2, (height) / 2);
	},
	startSnake : function (snakeProp) {
        "use strict";
        $(document).keypress(function (event) {
            var code = event.keyCode || event.which;
            if (code === 37 && snakeProp.snakeHead.direction !== "moveRight") {
                snakeProp.snakeHead.direction = "moveLeft";
            } else if (code === 38 && snakeProp.snakeHead.direction !== "moveDown") {
                snakeProp.snakeHead.direction = "moveUp";
            } else if (code === 39 && snakeProp.snakeHead.direction !== "moveLeft") {
                snakeProp.snakeHead.direction = "moveRight";
            } else if (code === 40 && snakeProp.snakeHead.direction !== "moveUp") {
                snakeProp.snakeHead.direction = "moveDown";
            }
			if (code) {
				event.preventDefault();
			}
			clearInterval(snakeProp.snakeTimer);
			snakeProp.snakeState = 1;
			snakeProp.snakeTimer = setInterval(snakeMovement, snakeProp.snakeSpeed);
        });
    },
	snakeMovement : function () {
		"use strict";
		var direction = snakeProp.snakeHead.direction, snakePointRemoved;
		if (validateSnakePosition()) {
			if (direction === "moveUp") {
				snakeProp.snakeHead.yPosition -= 1;
			} else if (direction === "moveRight") {
				snakeProp.snakeHead.xPosition += 1;
			} else if (direction === "moveDown") {
				snakeProp.snakeHead.yPosition += 1;
			} else if (direction === "moveLeft") {
				snakeProp.snakeHead.xPosition -= 1;
			}
			snakePointRemoved = checkIfFoodTakenandUpdateBody();
			clearAndDraw(snakePointRemoved);
		} else {
			resetAll();
		}
	}
};