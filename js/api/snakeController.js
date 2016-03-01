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