/*global SnakeObj, game, canvasOps, width, height, snake, food, obstaclesArr,
$, initialize*/
var validations = {
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
		return !(((snakeHead.xPosition + snakeHead.width) < food.xPosition) || (snakeHead.xPosition > (food.xPosition + 8)) || ((snakeHead.yPosition + snakeHead.height) < food.yPosition) || (snakeHead.yPosition > (food.yPosition + food.height)));
	},
	
	validateHeadAndObstacle : function (obstaclesArr, snakeHead) {
		"use strict";
		var i, obstacle;
		for (i = 0; i < obstaclesArr.length; i += 1) {
			obstacle = obstaclesArr[i];
			if (!(((snakeHead.xPosition + 8) < obstacle.xPosition) || (snakeHead.xPosition > (obstacle.xPosition + obstacle.width)) || ((snakeHead.yPosition + 8) < obstacle.yPosition) || (snakeHead.yPosition > (obstacle.yPosition + obstacle.height)))) {
				return true;
			}
		}
		return false;
	},
	validateSnakePosition : function (snake) {
		"use strict";
		var snakeHead = snake.snakeBody[snake.snakeBody.length - 1], i = null, snakePoint = null;

		if (validations.validateHead(snake.snakeHead, width, height) && !validations.validateHeadAndObstacle(obstaclesArr, snake.snakeHead)) {
			i = snake.snakeBody.length - 2;
			snakePoint = null;
			while (i >= 0) {
				snakePoint = snake.snakeBody[i];
				if (validations.validateHeadAndBody(snakePoint, snakeHead)) {
					return false;
				}
				i = i - 1;
			}
			return true;
		} else {
			return false;
		}
	}
};

var controller = {
	randomIntFromInterval : function (min, max) {
		"use strict";
		return Math.floor(Math.random() * (max - min + 1) + min);
	},
    createSnake : function () {
        "use strict";
		var snake = {}, i = 0, sk = null;
        snake.snakeBody = [];
        while (i < 30) {
            sk = new SnakeObj(i, 0, "moveRight", 8, 8);
            snake.snakeBody.push(sk);
            i = i + 1;
        }
        snake.snakeHead = new SnakeObj(i - 1, 0, "moveRight", 8, 8);
		return snake;
    },
	createFood : function (width, height) {
		"use strict";
		var foodPoint = {};
		foodPoint.xPosition = controller.randomIntFromInterval(1, width - 1);
		foodPoint.yPosition = controller.randomIntFromInterval(1, height - 1);
		while (true) {
			if (!validations.pointForSnakeOrFood(foodPoint.xPosition, foodPoint.yPosition, {"xPosition" : -1, "yPosition" : -1}, snake.snakeBody, obstaclesArr)) {
				foodPoint.xPosition = controller.randomIntFromInterval(1, width - 1);
				foodPoint.yPosition = controller.randomIntFromInterval(1, height - 1);
				break;
			}
		}
		foodPoint.width = 8;
		foodPoint.height = 8;
		return foodPoint;
	},
	createObstacles : function (width, height) {
		"use strict";
		var x, y, count = 0, obstaclesAr = [];

		while (count < 3) {
			x = controller.randomIntFromInterval(1, width - 1);
			y = controller.randomIntFromInterval(1, height - 1);
			if (!validations.pointForSnakeOrFood(x, y, food, snake.snakeBody, obstaclesAr)) {
				switch (count) {
				case 0:
					obstaclesAr.push({"xPosition" : x, "yPosition" : y, "width" : 2, "height" : 80});
					break;
				case 1:
					obstaclesAr.push({"xPosition" : x, "yPosition" : y, "width" : 8, "height" : 20});
					break;
				case 2:
					obstaclesAr.push({"xPosition" : x, "yPosition" : y, "width" : 80, "height" : 80});
					break;
				}
				count += 1;
			}
		}
		return obstaclesAr;
	}
};

var gameLogic = {
	startGame : function () {
		"use strict";
		if (game.state === -1) {
			gameLogic.resetAll();
			canvasOps.clearCanvas(width, height);
			initialize.initializeSnake(controller.createSnake());
			initialize.initializeFood(controller.createFood(width, height));
			initialize.initializeObstacles(controller.createObstacles(width, height));
			canvasOps.createAll(snake.snakeBody, obstaclesArr, food, width, height);
		}
		gameLogic.startSnake(snake, game);
		game.timer = setInterval(gameLogic.snakeMovement, game.speed);
		game.state = 1;
	},
	pauseGame : function () {
		"use strict";
		clearInterval(game.timer);
		game.state = 0;
	},
	resetGame: function () {
		"use strict";
		gameLogic.resetAll();
		gameLogic.startGame();
	},
	resetAll : function () {
		"use strict";
		initialize.initializeFood({"xPosition" : 0, "yPosition" : 0, "width" : 8, "height" : 8});
		initialize.initializeSnake({"snakeBody" : [], "snakeHead" : {}});
		initialize.initializeObstacles([]);
		clearInterval(game.timer);
		game.score = 0;
		game.speed = 10;
		game.state = -1;
		game.timer = null;
		canvasOps.updateScore(0);
	},
	startSnake : function (snakeProp, game) {
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
			clearInterval(game.timer);
			game.state = 1;
			game.timer = setInterval(gameLogic.snakeMovement, game.speed);
        });
    },
	snakeMovement : function () {
		"use strict";
		var direction = snake.snakeHead.direction;
		if (validations.validateSnakePosition(snake)) {
			if (direction === "moveUp") {
				snake.snakeHead.yPosition -= 1;
			} else if (direction === "moveRight") {
				snake.snakeHead.xPosition += 1;
			} else if (direction === "moveDown") {
				snake.snakeHead.yPosition += 1;
			} else if (direction === "moveLeft") {
				snake.snakeHead.xPosition -= 1;
			}
			gameLogic.updateSnakeBody(snake);
			if (validations.validateHeadAndFood(snake.snakeHead, food)) {
				gameLogic.addFoodToBody();
				game.score += 1;
				canvasOps.updateScore(game.score);
				gameLogic.updateGameSpeed();
				
				canvasOps.clearPoint(food);
				initialize.initializeFood(controller.createFood(width, height));
				canvasOps.createFoodPoint(food, width, height);
			}
		} else {
			gameLogic.resetAll();
			canvasOps.showOverMsg(width, height);
		}
	},
	updateSnakeBody : function (snake) {
		"use strict";
		var snakeTail = snake.snakeBody.shift();
		canvasOps.clearPoint(snakeTail);
		
		snakeTail.xPosition = snake.snakeHead.xPosition;
		snakeTail.yPosition = snake.snakeHead.yPosition;
		snakeTail.direction = snake.snakeHead.direction;
		
		snake.snakeBody.push(snakeTail);
		canvasOps.changeCanvasStyle("rgb(255, 255, 255)");
		canvasOps.fillRect(snakeTail);
	},
	addFoodToBody : function () {
		"use strict";
		var snakePoint = snake.snakeBody[0], pointToAdd = null;
		switch (snakePoint.direction) {
		case "moveLeft":
			pointToAdd = new SnakeObj(snakePoint.xPosition + 1, snakePoint.yPosition, snakePoint.direction, snakePoint.width, snakePoint.height);
			break;
		case "moveRight":
			pointToAdd = new SnakeObj(snakePoint.xPosition - 1, snakePoint.yPosition, snakePoint.direction, snakePoint.width, snakePoint.height);
			break;
		case "moveDown":
			pointToAdd = new SnakeObj(snakePoint.xPosition, snakePoint.yPosition + 1, snakePoint.direction, snakePoint.width, snakePoint.height);
			break;
		case "moveUp":
			pointToAdd = new SnakeObj(snakePoint.xPosition, snakePoint.yPosition - 1, snakePoint.direction, snakePoint.width, snakePoint.height);
			break;
		}
		snake.snakeBody.unshift(pointToAdd);
	},
	updateGameSpeed : function () {
		"use strict";
		if (game.score > 5) {
			game.speed = 8;
		} else if (game.score > 15) {
			game.speed = 6;
		} else if (game.score > 25) {
			game.speed = 4;
		} else if (game.score > 35) {
			game.speed = 2;
		} else if (game.score > 45) {
			game.speed = 1;
		} else if (game.score > 50) {
			game.speed = 0;
		}
	}
};

function start() {
	"use strict";
	gameLogic.startGame();
}
function pause() {
	"use strict";
	gameLogic.pauseGame();
}
function reset() {
	"use strict";
	gameLogic.resetGame();
}