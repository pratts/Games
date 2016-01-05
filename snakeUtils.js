/*global console, $, snakeProp, validateSnakePosition, updateSnakeBody, updateParentBody, resetAll, checkIfFoodTaken, canvasObj, canvasContext, food, SnakeObj, randomIntFromInterval, createSnakeAndFood*/
var canvasUtil = {
    snakeTimer : null,
    drawRect : function () {
        "use strict";
        canvasUtil.snakeTimer = setInterval(canvasUtil[snakeProp.snakeBody[0].direction], 50);
    },
    
    startSnake : function () {
        "use strict";
        $(document).keypress(function (event) {
            var code = event.keyCode || event.which;
            if (code === 37 && snakeProp.snakeBody[0].direction !== "moveRight") {
                snakeProp.snakeBody[0].direction = "moveLeft";
            } else if (code === 38 && snakeProp.snakeBody[0].direction !== "moveDown") {
                snakeProp.snakeBody[0].direction = "moveUp";
            } else if (code === 39 && snakeProp.snakeBody[0].direction !== "moveLeft") {
                snakeProp.snakeBody[0].direction = "moveRight";
            } else if (code === 40 && snakeProp.snakeBody[0].direction !== "moveUp") {
                snakeProp.snakeBody[0].direction = "moveDown";
            }
			clearInterval(canvasUtil.snakeTimer);
			snakeProp.snakeState = 1;
			canvasUtil.snakeTimer = setInterval(canvasUtil[snakeProp.snakeBody[0].direction], 50);
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
            canvasUtil.clearAndDraw();
			checkIfFoodTaken();
			updateSnakeBody();
            snakeProp.snakeBody[0].yPosition -= 1;
			updateParentBody();
        } else {
            resetAll();
        }
    },
    moveRight : function () {
        "use strict";
        if (validateSnakePosition()) {
            canvasUtil.clearAndDraw();
			checkIfFoodTaken();
			updateSnakeBody();
            snakeProp.snakeBody[0].xPosition += 1;
			updateParentBody();
        } else {
            resetAll();
        }
    },
    moveDown : function () {
        "use strict";
        if (validateSnakePosition()) {
            canvasUtil.clearAndDraw();
			checkIfFoodTaken();
			updateSnakeBody();
            snakeProp.snakeBody[0].yPosition += 1;
			updateParentBody();
			
        } else {
            resetAll();
        }
    },
    moveLeft : function () {
        "use strict";
        if (validateSnakePosition()) {
            canvasUtil.clearAndDraw();
			checkIfFoodTaken();
			updateSnakeBody();
            snakeProp.snakeBody[0].xPosition -= 1;
			updateParentBody();
			
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
	if ((snakeProp.snakeBody[0].xPosition <= canvasObj.width) && (snakeProp.snakeBody[0].yPosition <= canvasObj.height) && (snakeProp.snakeBody[0].xPosition >= 0) && (snakeProp.snakeBody[0].yPosition >= 0)) {
		var i = 1, snake = null;
		while (i < snakeProp.snakeBody.length) {
			snake = snakeProp.snakeBody[i];
			if ((snake.xPosition <= canvasObj.width && snake.yPosition <= canvasObj.height && snake.xPosition >= 0 && snake.yPosition >= 0)) {
				if (snake.xPosition === snakeProp.snakeBody[0].xPosition && snake.yPosition === snakeProp.snakeBody[0].yPosition) {
					return false;
				}
				i = i + 1;
			}
		}
		return true;
	} else {
		return false;
	}
}

function resetAll() {
    "use strict";
    snakeProp.snakeState = 0;
    snakeProp.snakeBody = [];
	var sk = new SnakeObj(0, 0, -1, -1, "moveRight");
	snakeProp.snakeBody.push(sk);
    clearInterval(canvasUtil.snakeTimer);
    canvasContext.clearRect(0, 0, canvasObj.width, canvasObj.height);
	canvasContext.fillText("GAME OVER !", (canvasObj.width - 65) / 2, (canvasObj.height) / 2);
}

function checkIfFoodTaken() {
	"use strict";
	if (snakeProp.snakeBody[0].xPosition === food.x && snakeProp.snakeBody[0].yPosition === food.y) {
		var s = new SnakeObj(food.x, food.y, snakeProp.snakeBody[snakeProp.snakeBody.length - 1].xPosition, snakeProp.snakeBody[snakeProp.snakeBody.length - 1].yPosition, snakeProp.snakeBody[snakeProp.snakeBody.length - 1].direction);
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
	var i = snakeProp.snakeBody.length - 1, snakePrev = null, snakeCur = null;
	while (i > 0) {
		snakePrev = snakeProp.snakeBody[i - 1];
		snakeCur = snakeProp.snakeBody[i];
		snakeCur.xPosition = snakePrev.xPosition;
		snakeCur.yPosition = snakePrev.yPosition;
		i = i - 1;
	}
}

function updateParentBody() {
	"use strict";
	var i = 1, snakePrev = null, snakeCur = null;
	while (i < snakeProp.snakeBody.length) {
		snakePrev = snakeProp.snakeBody[i - 1];
		snakeCur = snakeProp.snakeBody[i];
		snakeCur.parentX = snakePrev.xPosition;
		snakeCur.parentY = snakePrev.yPosition;
		i = i + 1;
	}
}