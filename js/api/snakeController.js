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
    }
};