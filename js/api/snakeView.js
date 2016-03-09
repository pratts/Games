/*global $*/
var canvasOps = {
	clearCanvas : function (canvasContext, width, height) {
		"use strict";
        canvasContext.clearRect(0, 0, width, height);
    },
	clearPoint : function (point, canvasContext) {
		"use strict";
		canvasContext.clearRect(point.xPosition, point.yPosition, point.width, point.height);
	},
	changeCanvasStyle : function (canvasContext, colorStr) {
		"use strict";
		canvasContext.fillStyle = colorStr;
	},
	fillRect : function (canvasContext, point) {
		"use strict";
		canvasContext.fillRect(point.xPosition, point.yPosition, point.width, point.height);
	},
	showOverMsg : function (canvasContext, width, height) {
		"use strict";
		canvasOps.clearCanvas(canvasContext, width, height);
		canvasOps.changeCanvasStyle("rgb(255, 255, 255)");
		canvasContext.fillText("GAME OVER !", (width - 65) / 2, (height) / 2);
	},
	createAll : function (snakeBody, obstacles, food, canvasContext, width, height) {
		"use strict";
		//clear everything
		canvasOps.clearCanvas(canvasContext, width, height);
		
		// create food
		canvasOps.createFoodPoint(food, canvasContext, width, height);
		
		// create snake
		canvasOps.createSnakeBody(snakeBody, canvasContext, width, height);
		
		// create obstacles
		canvasOps.createObstaclesArr(obstacles, canvasContext, width, height);
		
	},
	createSnakeBody : function (snakeBody, canvasContext, width, height) {
		"use strict";
		var i = 0;
		canvasOps.changeCanvasStyle(canvasContext, "rgb(255, 255, 255)");
		for (i = 0; i < snakeBody.length; i += 1) {
			canvasOps.fillRect(canvasContext, snakeBody[i]);
		}
	},
	createFoodPoint : function (food, canvasContext, width, height) {
		"use strict";
		canvasOps.changeCanvasStyle(canvasContext, "rgb(255, 255, 0)");
		canvasOps.fillRect(canvasContext, food);
	},
	createObstaclesArr : function (obstacles, canvasContext, width, height) {
		"use strict";
		var i = 0;
		for (i = 0; i < obstacles.length; i += 1) {
			canvasOps.fillRect(canvasContext, obstacles[i]);
		}
	},
	updateScore : function (score) {
		"use strict";
		$('.snakeScore').text(score);
	}
};