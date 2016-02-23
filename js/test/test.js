exports.testSomething = function (test) {
	"use strict";
    test.expect(1);
    test.ok(true, "this assertion should pass");
    test.done();
};

exports.testSomethingElse = function (test) {
	"use strict";
    test.ok(true, "this assertion should fail");
    test.done();
};