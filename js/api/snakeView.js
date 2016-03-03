var canvasOps = {
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
	showOverMsg : function (canvasContext, width, height) {
		"use strict";
		canvasContext.fillText("GAME OVER !", (width - 65) / 2, (height) / 2);
	},
	createAll : function (snakeBody, obstacles, food, canvasContext, width, height) {
		"use strict";
		canvasOps.clearCanvas(canvasContext, width, height);
		
		// create food
		
		// create snake
		
		// create obstacles
	}
};