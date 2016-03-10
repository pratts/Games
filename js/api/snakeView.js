/*global $, canvasContext*/
var canvasOps = {
	clearCanvas : function (width, height) {
		"use strict";
        canvasContext.clearRect(0, 0, width, height);
    },
	clearPoint : function (point) {
		"use strict";
		canvasContext.clearRect(point.xPosition, point.yPosition, point.width, point.height);
	},
	changeCanvasStyle : function (colorStr) {
		"use strict";
		canvasContext.fillStyle = colorStr;
	},
	fillRect : function (point) {
		"use strict";
		canvasContext.fillRect(point.xPosition, point.yPosition, point.width, point.height);
	},
	showOverMsg : function (width, height) {
		"use strict";
		canvasOps.clearCanvas(width, height);
		canvasOps.changeCanvasStyle("rgb(255, 255, 255)");
		canvasContext.fillText("GAME OVER !", (width - 65) / 2, (height) / 2);
	},
	createAll : function (snakeBody, obstacles, food, width, height) {
		"use strict";
		//clear everything
		canvasOps.clearCanvas(width, height);
		
		// create food
		canvasOps.createFoodPoint(food, width, height);
		
		// create snake
		canvasOps.createSnakeBody(snakeBody, width, height);
		
		// create obstacles
		canvasOps.createObstaclesArr(obstacles, width, height);
		
	},
	createSnakeBody : function (snakeBody, width, height) {
		"use strict";
		var i = 0;
		canvasOps.changeCanvasStyle("rgb(255, 255, 255)");
		for (i = 0; i < snakeBody.length; i += 1) {
			canvasOps.fillRect(snakeBody[i]);
		}
	},
	createFoodPoint : function (food, width, height) {
		"use strict";
		canvasOps.changeCanvasStyle("rgb(255, 255, 0)");
		canvasOps.fillRect(food);
	},
	createObstaclesArr : function (obstacles, width, height) {
		"use strict";
		var i = 0;
		for (i = 0; i < obstacles.length; i += 1) {
			canvasOps.fillRect(obstacles[i]);
		}
	},
	updateScore : function (score) {
		"use strict";
		$('.snakeScore').text(score);
	}
};