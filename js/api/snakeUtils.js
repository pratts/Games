/*global console, $, snakeProp, validateSnakePosition, updateSnakeBody, resetAll, checkIfFoodTakenandUpdateBody, canvasObj, canvasContext, food, SnakeObj, randomIntFromInterval, createSnakeAndFood, obstaclesArr, width, height*/
function clearAndDraw(snakePointRemoved) {
	"use strict";
	canvasContext.fillStyle = "rgb(255, 255, 255)";
	canvasContext.clearRect(snakePointRemoved.xPosition, snakePointRemoved.yPosition, 8, 8);
	canvasContext.fillRect(snakeProp.snakeHead.xPosition, snakeProp.snakeHead.yPosition, 8, 8);
}

var validations = {
	validateHead : function (snakeHead) {
		"use strict";
		return ((snakeHead.xPosition <= width) && (snakeHead.yPosition <= height) && (snakeHead.xPosition >= 0) && (snakeHead.yPosition >= 0));
	},
	
	validateHeadAndBody : function (snake, snakeHead) {
		"use strict";
		return (snake.xPosition === snakeHead.xPosition && snake.yPosition === snakeHead.yPosition);
	},
	
	validateHeadAndFood : function () {
		"use strict";
		return !(((snakeProp.snakeHead.xPosition + 8) < food.x) || (snakeProp.snakeHead.xPosition > (food.x + 8)) || ((snakeProp.snakeHead.yPosition + 8) < food.y) || (snakeProp.snakeHead.yPosition > (food.y + 8)));
	},
	
	validateHeadAndObstacle : function () {
		"use strict";
		var i, obstacle;
		for (i = 0; i < obstaclesArr.length; i += 1) {
			obstacle = obstaclesArr[i];
			if (!(((snakeProp.snakeHead.xPosition + 8) < obstacle.x) || (snakeProp.snakeHead.xPosition > (obstacle.x + obstacle.width)) || ((snakeProp.snakeHead.yPosition + 8) < obstacle.y) || (snakeProp.snakeHead.yPosition > (obstacle.y + obstacle.height)))) {
				return true;
			}
		}
		return false;
	}
};

function snakeMovement() {
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

var canvasUtil = {
    startSnake : function () {
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
    }
};

function startSnake() {
    "use strict";
	if (snakeProp.snakeState === -1) {
		createSnakeAndFood();
		snakeProp.snakeState = 0;
		$('.snakeScore').text(snakeProp.snakeScore);
	}
	
    canvasUtil.startSnake();
    if (snakeProp.snakeState === 0) {
        snakeProp.snakeState = 1;
		snakeProp.snakeTimer = setInterval(snakeMovement, snakeProp.snakeSpeed);
    }
}

function pauseSnake() {
    "use strict";
    if (snakeProp.snakeState === 1) {
		snakeProp.snakeState = 0;
		clearInterval(snakeProp.snakeTimer);
	}
}
function resetSnake() {
    "use strict";
	createSnakeAndFood();
	$('.snakeScore').text(0);
	snakeProp.snakeScore = 0;
	snakeProp.snakeSpeed = 10;
    pauseSnake();
    startSnake();
}

function validateSnakePosition() {
	"use strict";
	var snakeHead = snakeProp.snakeBody[snakeProp.snakeBody.length - 1], i = null, snake = null;
	
	if (validations.validateHead(snakeHead) && !validations.validateHeadAndObstacle()) {
		i = snakeProp.snakeBody.length - 2;
		snake = null;
		while (i > 0) {
			snake = snakeProp.snakeBody[i];
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
}

function checkIfFoodTakenandUpdateBody() {
	"use strict";
	var i = 1, snakePrev = null, snakeCur = null, s = null, snakeTail = null, snakePoint;
	if (validations.validateHeadAndFood()) {
		s = new SnakeObj(food.x, food.y, snakeProp.snakeHead.direction);
		snakeProp.snakeBody.unshift(s);
		canvasContext.clearRect(food.x, food.y, 8, 8);
		food.x = randomIntFromInterval(1, width - 1);
		food.y = randomIntFromInterval(1, height - 1);
		canvasContext.fillStyle = "rgb(255, 255, 0)";
		canvasContext.fillRect(food.x, food.y, 8, 8);
		snakeProp.snakeScore += 1;
		if (snakeProp.snakeScore > 5) {
			snakeProp.snakeSpeed = 5;
		} else if (snakeProp.snakeScore > 10) {
			snakeProp.snakeSpeed = 1;
		}
		$('.snakeScore').text(snakeProp.snakeScore);
	}
	
	snakePoint = snakeProp.snakeBody.shift();
	snakeTail = new SnakeObj(snakeProp.snakeHead.xPosition, snakeProp.snakeHead.yPosition, snakeProp.snakeHead.direction);
	snakeProp.snakeBody.push(snakeTail);
	return snakePoint;
}