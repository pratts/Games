/*global snakeProp, SnakeObj, validations*/
var width = 600,
	height = 500;
this.testValidations = {
    'testSnakeHeadInsideCanvas': function (test) {
		"use strict";
		snakeProp.snakeHead = new SnakeObj(3, 0, "moveRight");
		var isHeadValid = validations.validateHead(snakeProp.snakeHead);
        test.ok(true, isHeadValid);
        test.done();
    },
	'testSnakeHeadAndBodyFalse': function (test) {
		"use strict";
		snakeProp.snakeHead = new SnakeObj(3, 0, "moveRight");
		var snake = new SnakeObj(3, 0, "moveRight"),
			headBodyCollide = validations.validateHeadAndBody(snake, snakeProp.snakeHead);
        test.ok(true, headBodyCollide);
        test.done();
    },
	'testSnakeHeadAndBodyTrue': function (test) {
		"use strict";
		snakeProp.snakeHead = new SnakeObj(5, 0, "moveRight");
		var snake = new SnakeObj(2, 0, "moveRight"),
			headBodyCollide = validations.validateHeadAndBody(snake, snakeProp.snakeHead);
        test.ok(true, headBodyCollide);
        test.done();
    },
	'testSnakeHeadAndFoodTrue': function (test) {
		"use strict";
		snakeProp.snakeHead = new SnakeObj(14, 0, "moveRight");
		food = {"x": 5, "y": 0};
		var headBodyCollide = validations.validateHeadAndFood();
        test.ok(true, headBodyCollide);
        test.done();
    },
	'testSnakeHeadAndFoodFalse': function (test) {
		"use strict";
		snakeProp.snakeHead = new SnakeObj(5, 0, "moveRight");
		food = {"x": 99, "y": 39};
		var headBodyCollide = validations.validateHeadAndFood();
        test.ok(true, headBodyCollide);
        test.done();
    }
};