/*global console, $*/
function randomIntFromInterval(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var snake = {
    xPosition : 0,
    yPosition : 0,
    headPosition : 0,
    tailPosition : 0,
    lengthBody : 4,
    direction : "moveRight",
    snakeState : 0 //0 for stopped and 1 for moving
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
        if (canvasUtil.canvasObj.getContext) {
            canvasUtil.canvasContext = canvasUtil.canvasObj.getContext('2d');
            canvasUtil.canvasContext.fillStyle = "rgb(255, 255, 255)";
            canvasUtil.canvasContext.clearRect(0, 0, canvasUtil.canvasObj.width, canvasUtil.canvasObj.height);
            food.x = randomIntFromInterval(1, canvasUtil.canvasObj.width);
            food.y = randomIntFromInterval(1, canvasUtil.canvasObj.height);
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
        if (snake.xPosition <= canvasUtil.canvasObj.width && snake.yPosition <= canvasUtil.canvasObj.height && snake.xPosition >= 0 && snake.yPosition >= 0) {
            console.log("inside");
            canvasUtil.clearAndDraw();
            snake.yPosition -= 1;
        } else {
            console.log("outside");
            resetAll();
            canvasUtil.canvasContext.fillText("GAME OVER !", (canvasUtil.canvasObj.width - 65) / 2, (canvasUtil.canvasObj.height) / 2);
        }
    },
    moveRight : function () {
        "use strict";
        if (snake.xPosition <= canvasUtil.canvasObj.width && snake.yPosition <= canvasUtil.canvasObj.height && snake.xPosition >= 0 && snake.yPosition >= 0) {
            console.log("inside");
            canvasUtil.clearAndDraw();
            snake.xPosition += 1;
        } else {
            console.log("outside");
            resetAll();
            canvasUtil.canvasContext.fillText("GAME OVER !", (canvasUtil.canvasObj.width - 65) / 2, (canvasUtil.canvasObj.height) / 2);
        }
    },
    moveDown : function () {
        "use strict";
        if (snake.xPosition <= canvasUtil.canvasObj.width && snake.yPosition <= canvasUtil.canvasObj.height && snake.xPosition >= 0 && snake.yPosition >= 0) {
            console.log("inside");
            canvasUtil.clearAndDraw();
            snake.yPosition += 1;
        } else {
            console.log("outside");
            resetAll();
            canvasUtil.canvasContext.fillText("GAME OVER !", (canvasUtil.canvasObj.width - 65) / 2, (canvasUtil.canvasObj.height) / 2);
        }
    },
    moveLeft : function () {
        "use strict";
        if (snake.xPosition <= canvasUtil.canvasObj.width && snake.yPosition <= canvasUtil.canvasObj.height && snake.xPosition >= 0 && snake.yPosition >= 0) {
            console.log("inside");
            canvasUtil.clearAndDraw();
            snake.xPosition -= 1;
        } else {
            console.log("outside");
            resetAll();
            canvasUtil.canvasContext.fillText("GAME OVER !", (canvasUtil.canvasObj.width - 65) / 2, (canvasUtil.canvasObj.height) / 2);
        }
    },
    clearAndDraw : function () {
        "use strict";
        canvasUtil.canvasContext.clearRect(0, 0, canvasUtil.canvasObj.width, canvasUtil.canvasObj.height);
        canvasUtil.canvasContext.fillRect(food.x, food.y, 4, 4);
        canvasUtil.canvasContext.fillRect(snake.xPosition, snake.yPosition, snake.lengthBody, 4);
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
    canvasUtil.canvasContext.clearRect(0, 0, canvasUtil.canvasObj.width, canvasUtil.canvasObj.height);
    food.x = randomIntFromInterval(1, canvasUtil.canvasObj.width);
    food.y = randomIntFromInterval(1, canvasUtil.canvasObj.height);
    pauseSnake();
    startSnake();
}

function resetAll() {
    "use strict";
    snake.snakeState = 0;
    snake.direction = "moveRight";
    snake.xPosition = 0;
    snake.yPosition = 0;
    clearInterval(canvasUtil.snakeTimer);
    canvasUtil.canvasContext.clearRect(0, 0, canvasUtil.canvasObj.width,            canvasUtil.canvasObj.height);
}