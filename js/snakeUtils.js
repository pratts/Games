/*global console, $, snakeProp, validateSnakePosition, updateSnakeBody, resetAll, checkIfFoodTaken, canvasObj, canvasContext, food, SnakeObj, randomIntFromInterval, createSnakeAndFood*/
var canvasUtil = {
    snakeTimer : null,
    drawRect : function () {
        "use strict";
        canvasUtil.snakeTimer = setInterval(canvasUtil[snakeProp.snakeHead.direction], 10);
    },
    
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
			clearInterval(canvasUtil.snakeTimer);
			snakeProp.snakeState = 1;
			canvasUtil.snakeTimer = setInterval(canvasUtil[snakeProp.snakeHead.direction], 10);
        });
    },
    
    pauseSnake : function () {
        "use strict";
        if (snakeProp.snakeState === 1) {
            snakeProp.snakeState = 0;
            clearInterval(canvasUtil.snakeTimer);
        }
    },
    moveUp : function () {
        "use strict";
        if (validateSnakePosition()) {
			checkIfFoodTaken();
			updateSnakeBody();
			snakeProp.snakeHead.yPosition = snakeProp.snakeHead.yPosition - 1;
			snakeProp.snakeBody[snakeProp.snakeBody.length - 1] = snakeProp.snakeHead;
			canvasUtil.clearAndDraw();

        } else {
            resetAll();
        }
    },
    moveRight : function () {
        "use strict";
        if (validateSnakePosition()) {
			checkIfFoodTaken();
			updateSnakeBody();
			snakeProp.snakeHead.xPosition = snakeProp.snakeHead.xPosition + 1;
			snakeProp.snakeBody[snakeProp.snakeBody.length - 1] = snakeProp.snakeHead;
			canvasUtil.clearAndDraw();
        } else {
            resetAll();
        }
    },
    moveDown : function () {
        "use strict";
        if (validateSnakePosition()) {
			checkIfFoodTaken();
			updateSnakeBody();
			snakeProp.snakeHead.yPosition = snakeProp.snakeHead.yPosition + 1;
			snakeProp.snakeBody[snakeProp.snakeBody.length - 1] = snakeProp.snakeHead;
			canvasUtil.clearAndDraw();
        } else {
            resetAll();
        }
    },
    moveLeft : function () {
        "use strict";
        if (validateSnakePosition()) {
			checkIfFoodTaken();
			updateSnakeBody();
			snakeProp.snakeHead.xPosition = snakeProp.snakeHead.xPosition - 1;
			snakeProp.snakeBody[snakeProp.snakeBody.length - 1] = snakeProp.snakeHead;
			canvasUtil.clearAndDraw();
        } else {
            resetAll();
        }
    },
    clearAndDraw : function () {
        "use strict";
        canvasContext.clearRect(0, 0, canvasObj.width, canvasObj.height);
        canvasContext.fillRect(food.x, food.y, 1, 1);
		var i = 0, snake = null;
		while (i < snakeProp.snakeBody.length) {
			snake = snakeProp.snakeBody[i];
			canvasContext.fillRect(snake.xPosition, snake.yPosition, 1, 1);
			i = i + 1;
		}
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
        canvasUtil.drawRect();
    }
}

function pauseSnake() {
    "use strict";
    canvasUtil.pauseSnake();
}
function resetSnake() {
    "use strict";
	createSnakeAndFood();
	$('.snakeScore').text(0);
	snakeProp.snakeScore = 0;
    pauseSnake();
    startSnake();
}

function validateSnakePosition() {
	"use strict";
	if ((snakeProp.snakeHead.xPosition <= canvasObj.width) && (snakeProp.snakeHead.yPosition <= canvasObj.height) && (snakeProp.snakeHead.xPosition >= 0) && (snakeProp.snakeHead.yPosition >= 0)) {
		var i = snakeProp.snakeBody.length - 2, snake = null;
		while (i > 0) {
			snake = snakeProp.snakeBody[i];
			if ((snake.xPosition <= canvasObj.width && snake.yPosition <= canvasObj.height && snake.xPosition >= 0 && snake.yPosition >= 0)) {
				if (snake.xPosition === snakeProp.snakeHead.xPosition && snake.yPosition === snakeProp.snakeHead.yPosition) {
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
	var i = 30, sk = null;
	while (i > 0) {
		if (i === 30) {
			sk = new SnakeObj(i, 0, -1, 0, "moveRight");
			snakeProp.snakeHead = sk;
			snakeProp.snakeBody.push(sk);
		} else {
			sk = new SnakeObj(i, 0, i + 1, 0, "moveRight");
			snakeProp.snakeBody.push(sk);
		}
		i = i - 1;
	}
    clearInterval(canvasUtil.snakeTimer);
    canvasContext.clearRect(0, 0, canvasObj.width, canvasObj.height);
	canvasContext.fillText("GAME OVER !", (canvasObj.width - 65) / 2, (canvasObj.height) / 2);
}

function checkIfFoodTaken() {
	"use strict";
	if (snakeProp.snakeHead.xPosition === food.x && snakeProp.snakeHead.yPosition === food.y) {
		var s = new SnakeObj(food.x, food.y, snakeProp.snakeBody[0].xPosition, snakeProp.snakeBody[0].yPosition, snakeProp.snakeBody[0].direction);
		snakeProp.snakeBody.unshift(s);
		canvasContext.clearRect(food.x, food.y, 1, 1);
		food.x = randomIntFromInterval(1, canvasObj.width);
		food.y = randomIntFromInterval(1, canvasObj.height);
		canvasContext.fillRect(food.x, food.y, 1, 1);
		snakeProp.snakeScore += 1;
		$('.snakeScore').text(snakeProp.snakeScore);
	}
}

function updateSnakeBody() {
	"use strict";
	var i = 1, snakePrev = null, snakeCur = null;
	while (i < snakeProp.snakeBody.length) {
		snakeProp.snakeBody[i - 1].xPosition = snakeProp.snakeBody[i].xPosition;
		snakeProp.snakeBody[i - 1].yPosition = snakeProp.snakeBody[i].yPosition;
		snakeProp.snakeBody[i - 1].direction = snakeProp.snakeBody[i].direction;
		i = i + 1;
	}
}