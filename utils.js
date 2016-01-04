/*global console, $*/
function randomIntFromInterval(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var snakeProp = {
	snakeScore : 0,
	snakeState : 0, //0 for stopped and 1 for moving
	lengthBody : 1,
	snakeBody : []
};

var SnakeObj = function (xPosition, yPosition, parentX, parentY, direction) {
	"use strict";
	this.xPosition = 0;
    this.yPosition = 0;
	this.parentX = -1;
	this.parentY = -1;
    this.direction = direction;
};

var food = {
    x : 0,
    y : 0
};

var canvasObj = document.getElementById("canvasElem");
var canvasContext = null;
if (canvasObj.getContext) {
	canvasContext = canvasObj.getContext('2d');
	canvasContext.fillStyle = "rgb(255, 255, 255)";
	canvasContext.clearRect(0, 0, canvasObj.width, canvasObj.height);
	food.x = randomIntFromInterval(1, canvasObj.width);
	food.y = randomIntFromInterval(1, canvasObj.height);
	for(var i=0;i<5;i++) {
		var sk = new SnakeObj(i, 0, i-1, 0, "moveRight");
		snakeProp.snakeBody.push(sk);
	}
}

var canvasUtil = {
    canvasObj : document.getElementById("canvasElem"),
    canvasContext : null,
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
                //console.log("LEFT");
                snakeProp.snakeBody[0].direction = "moveLeft";
            } else if (code === 38 && snakeProp.snakeBody[0].direction !== "moveDown") {
                //console.log("UP");
                snakeProp.snakeBody[0].direction = "moveUp";
            } else if (code === 39 && snakeProp.snakeBody[0].direction !== "moveLeft") {
                //console.log("RIGHT");
                snakeProp.snakeBody[0].direction = "moveRight";
            } else if (code === 40 && snakeProp.snakeBody[0].direction !== "moveUp") {
                //console.log("DOWN");
                snakeProp.snakeBody[0].direction = "moveDown";
            } else {
                //console.log(41);
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
            //console.log("inside");
            canvasUtil.clearAndDraw();
			updateSnakeBody();
            snakeProp.snakeBody[0].yPosition -= 1;
			updateParentBody();
			checkIfFoodTaken();
        } else {
            //console.log("outside");
            resetAll();
        }
    },
    moveRight : function () {
        "use strict";
        if (validateSnakePosition()) {
            //console.log("inside");
            canvasUtil.clearAndDraw();
			updateSnakeBody();
            snakeProp.snakeBody[0].xPosition += 1;
			updateParentBody();
			checkIfFoodTaken();
        } else {
            //console.log("outside");
            resetAll();
        }
    },
    moveDown : function () {
        "use strict";
        if (validateSnakePosition()) {
            //console.log("inside");
            canvasUtil.clearAndDraw();
			updateSnakeBody();
            snakeProp.snakeBody[0].yPosition += 1;
			updateParentBody();
			checkIfFoodTaken();
        } else {
            //console.log("outside");
            resetAll();
        }
    },
    moveLeft : function () {
        "use strict";
        if (validateSnakePosition()) {
            //console.log("inside");
            canvasUtil.clearAndDraw();
			updateSnakeBody();
            snakeProp.snakeBody[0].xPosition -= 1;
			updateParentBody();
			checkIfFoodTaken();
        } else {
            //console.log("outside");
            resetAll();
        }
    },
    clearAndDraw : function () {
        "use strict";
        canvasContext.clearRect(0, 0, canvasObj.width, canvasObj.height);
        canvasContext.fillRect(food.x, food.y, 1, 1);
		for (var i=0 ; i < snakeProp.snakeBody.length ; i++) {
			var snake = snakeProp.snakeBody[i];
			//console.log(i+":"+snake);
			canvasContext.fillRect(snake.xPosition, snake.yPosition, 1, 1);
		}
    }
};

function startSnake() {
    "use strict";
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
	snakeProp.snakeBody = [];
	var sk = new SnakeObj(0, 0, -1, -1, "moveRight");
	snakeProp.snakeBody.push(sk);
    canvasContext.clearRect(0, 0, canvasObj.width, canvasObj.height);
    food.x = randomIntFromInterval(1, canvasObj.width);
    food.y = randomIntFromInterval(1, canvasObj.height);
	$('.snakeScore').text(0);
	snakeProp.snakeScore = 0;
    pauseSnake();
    startSnake();
}

function validateSnakePosition() {
	"use strict";
	if((snakeProp.snakeBody[0].xPosition <= canvasObj.width && snakeProp.snakeBody[0].yPosition <= canvasObj.height && snakeProp.snakeBody[0].xPosition >= 0 && snakeProp.snakeBody[0].yPosition >= 0)) {
		//console.log("first check");
		return true;
	}
	for(var i=1;i<snakeProp.snakeBody.length;i++) {
		var snake = snakeProp.snakeBody[i];
		if((snake.xPosition <= canvasObj.width && snake.yPosition <= canvasObj.height && snake.xPosition >= 0 && snake.yPosition >= 0)) {
			//console.log("second check");
			return true;
		} else if(snake.xPosition === snakeProp.snakeBody[0].xPosition || snake.yPosition === snakeProp.snakeBody[0].yPosition) {
			//console.log("third check");
			return false;
		}
	}
	//console.log("last check");
	return false;
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
		var s = new SnakeObj(food.x, food.y, snakeProp.snakeBody[snakeProp.snakeBody.length-1].xPosition, snakeProp.snakeBody[snakeProp.snakeBody.length-1].xPosition, snakeProp.snakeBody[snakeProp.snakeBody.length-1].direction);
		snakeProp.snakeBody.push(s);
		canvasContext.clearRect(food.x, food.y, 4, 4);
		food.x = randomIntFromInterval(1, canvasObj.width);
		food.y = randomIntFromInterval(1, canvasObj.height);
		canvasContext.fillRect(food.x, food.y, 1, 1);
		snakeProp.snakeScore += 1;
		$('.snakeScore').text(snakeProp.snakeScore);
	}
}

function updateSnakeBody() {
	for(var i=snakeProp.snakeBody.length-1;i>0;i--) {
		var snakePrev = snakeProp.snakeBody[i-1];
		var snakeCur = snakeProp.snakeBody[i];
		snakeCur.xPosition = snakePrev.xPosition;
		snakeCur.yPosition = snakePrev.yPosition;
	}
}

function updateParentBody() {
	for(var i=1;i<snakeProp.snakeBody.length;i++) {
		var snakePrev = snakeProp.snakeBody[i-1];
		var snakeCur = snakeProp.snakeBody[i];
		snakeCur.parentX = snakePrev.xPosition;
		snakeCur.parentY = snakePrev.yPosition;
	}
}