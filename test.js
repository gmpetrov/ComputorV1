var cow = require('/computorJs').create;

casper.test.begin("Hello, Test!", 1, function(test) {
	test.assertEquals(cow.hello(), "hello");
	test.done();
});