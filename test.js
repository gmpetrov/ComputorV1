var cow = require('/test1').create;

casper.test.begin("Hello, Test!", 1, function(test) {
	test.assertEquals(cow.salut(), "meuuh");
	test.assert(cow.isOld);
	test.done();
});