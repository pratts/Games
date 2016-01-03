/*global console, $*/

var canvasObj = document.getElementById("canvasElem");
var canvasContext = null;
if (canvasObj.getContext) {
	canvasContext = canvasObj.getContext('2d');
}

function randomIntFromInterval(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var snake = {
    xPosition : 0,
    yPosition : 0,
    headXposition : 0,
    headYposition : 0,
    lengthBody : 4,
    direction : "moveRight",
    snakeState : 0, //0 for stopped and 1 for moving
	snakeScore : 0
};

var food = {
    x : 0,
    y : 0
};

var canvasUtil = {
    canvasObj : document.getElementById("canvasElem"),
    canvasContext : null,
    snakeTimer : null,
    initializeData : function () {
        "use strict";
        if (canvasObj.getContext) {
            canvasContext.fillStyle = "rgb(255, 255, 255)";
            canvasContext.clearRect(0, 0, canvasObj.width, canvasObj.height);
            food.x = randomIntFromInterval(1, canvasObj.width);
            food.y = randomIntFromInterval(1, canvasObj.height);
        }
    },
    drawRect : function () {
        "use strict";
        canvasUtil.snakeTimer = setInterval(canvasUtil[snake.direction], 50);
    },
    
    startSnake : function () {
        "use strict";
        $(document).keypress(function (event) {
            var code = event.keyCode || event.which;
            if (code === 37 && snake.direction !== "moveRight") {
                console.log("LEFT");
                snake.direction = "moveLeft";
            } else if (code === 38 && snake.direction !== "moveDown") {
                console.log("UP");
                snake.direction = "moveUp";
            } else if (code === 39 && snake.direction !== "moveLeft") {
                console.log("RIGHT");
                snake.direction = "moveRight";
            } else if (code === 40 && snake.direction !== "moveUp") {
                console.log("DOWN");
                snake.direction = "moveDown";
            } else {
                console.log(41);
            }
            clearInterval(canvasUtil.snakeTimer);
            snake.snakeState = 1;
            canvasUtil.snakeTimer = setInterval(canvasUtil[snake.direction], 50);
        });
    },
    
    pauseSnake : function () {
        "use strict";
        if (snake.snakeState === 1) {
            snake.snakeState = 0;
            clearInterval(canvasUtil.snakeTimer);
        }
    },
    moveUp : function () {
        "use strict";
        if (validateSnakePosition()) {
            console.log("inside");
            canvasUtil.clearAndDraw();
            snake.yPosition -= 1;
			checkIfFoodTaken();
        } else {
            console.log("outside");
            resetAll();
        }
    },
    moveRight : function () {
        "use strict";
        if (validateSnakePosition()) {
            console.log("inside");
            canvasUtil.clearAndDraw();
            snake.xPosition += 1;
			checkIfFoodTaken();
        } else {
            console.log("outside");
            resetAll();
        }
    },
    moveDown : function () {
        "use strict";
        if (validateSnakePosition()) {
            console.log("inside");
            canvasUtil.clearAndDraw();
            snake.yPosition += 1;
			checkIfFoodTaken();
        } else {
            console.log("outside");
            resetAll();
        }
    },
    moveLeft : function () {
        "use strict";
        if (validateSnakePosition()) {
            console.log("inside");
            canvasUtil.clearAndDraw();
            snake.xPosition -= 1;
			checkIfFoodTaken();
        } else {
            console.log("outside");
            resetAll();
        }
    },
    clearAndDraw : function () {
        "use strict";
        canvasContext.clearRect(0, 0, canvasObj.width, canvasObj.height);
        canvasContext.fillRect(food.x, food.y, 4, 4);
        canvasContext.fillRect(snake.xPosition, snake.yPosition, snake.lengthBody, 4);
    }
};

canvasUtil.initializeData();

function startSnake() {
    "use strict";
    canvasUtil.startSnake();
    if (snake.snakeState === 0) {
        snake.snakeState = 1;
        canvasUtil.drawRect();
    }
}

function pauseSnake() {
    "use strict";
    canvasUtil.pauseSnake();
}
function resetSnake() {
    "use strict";
    snake.xPosition = 0;
    snake.yPosition = 0;
    snake.direction = "moveRight";
    canvasContext.clearRect(0, 0, canvasObj.width, canvasObj.height);
    food.x = randomIntFromInterval(1, canvasObj.width);
    food.y = randomIntFromInterval(1, canvasObj.height);
	$('.snakeScore').text(0);
	snake.snakeScore = 0;
    pauseSnake();
    startSnake();
}

function validateSnakePosition() {
	"use strict";
	return (snake.xPosition <= canvasObj.width && snake.yPosition <= canvasObj.height && snake.xPosition >= 0 && snake.yPosition >= 0);
}

function resetAll() {
    "use strict";
    snake.snakeState = 0;
    snake.direction = "moveRight";
    snake.xPosition = 0;
    snake.yPosition = 0;
    clearInterval(canvasUtil.snakeTimer);
    canvasContext.clearRect(0, 0, canvasObj.width,            canvasObj.height);
	canvasContext.fillText("GAME OVER !", (canvasObj.width - 65) / 2, (canvasObj.height) / 2);
}

function checkIfFoodTaken() {
	"use strict";
	if (snake.xPosition === food.x && snake.yPosition === food.y) {
		canvasContext.clearRect(food.x, food.y, 4, 4);
		food.x = randomIntFromInterval(1, canvasObj.width);
		food.y = randomIntFromInterval(1, canvasObj.height);
		canvasContext.fillRect(food.x, food.y, 4, 4);
		snake.snakeScore += 1;
		$('.snakeScore').text(snake.snakeScore);
	}
}