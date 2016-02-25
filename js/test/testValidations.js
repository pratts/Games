this.testValidations = {
    'testSnakeHeadInsideCanvas': function (test) {
		"use strict";
		createSnakeAndFood();
		var isHeadValid = validations.validateHead();
        test.ok(true, isHeadValid);
        test.done();
    }
};