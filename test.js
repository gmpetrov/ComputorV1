var regexp = require('./regexp').create;
var errorHandler = require('./errorHandler').create;

casper.test.begin("REGEXP TEST", 3, function(test) {
	test.assert(regexp.isNum.test("123456"));
	test.assert(regexp.isNum.test("-123456"));
	test.assert(!regexp.isNum.test("123a56"));
	test.done();
});