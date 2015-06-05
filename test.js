var regexp 			= require('./regexp').create;

casper.test.begin("REGEXP TEST", 8, function(test) {
	test.assert(regexp.isNum.test("123456"), "isNUm : 123456");
	test.assert(regexp.isNum.test("-123456"), "isNUm : -123456");
	test.assertNot(regexp.isNum.test("123a56"), "isNum : 123a56");
	test.assertEquals(regexp.getExposants.exec("X^-1")[1], "-1");
	test.assertNot(regexp.isNum.test("123a56"), "isNum : 123a56");
    test.assertNot(regexp.isEquationValid.test("A * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^2"));
    test.assertNot(regexp.isEquationValid.test("5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^B"));
    test.assertNot(regexp.isEquationValid.test("5 * X^0 + 4 * X^1 - 9.3 * X^2 1 * X^2"));
	test.done();
});
