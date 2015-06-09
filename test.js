var regexp 			= require('./regexp'),
    utils           = require('./myUtils'),
    errorHandler    = require('./errorHandler');

var         equation = {};

function main(arg) {
        var eq = arg;
        if (regexp.isEquationValid.exec(eq)) {
            equation.eq = eq.replace(/\s+/g, "");
            equation.lhs = regexp.getLhs.exec(equation.eq)[1].trim();
            equation.rhs = regexp.getRhs.exec(equation.eq)[1].trim();
            equation.lhsPolynomes = utils.getRegexpMatches(equation.lhs);
            equation.rhsPolynomes = utils.getRegexpMatches(equation.rhs);

            var matches = [],
                match,
                degree = 0;
            while (match = regexp.getExposants.exec(equation.eq)) {
                errorHandler.checkExposant(match[1]);
                if (degree < parseInt(match[1]))
                    degree = parseInt(match[1]);
                matches.push(match[1]);
            }
            equation.degree = degree;
            equation.reduced = equation.lhs + " " + utils.rhsToLhs(equation.rhsPolynomes);
            equation.reduced = utils.addPolynomesFromString(equation.reduced, degree);
            var solution = utils.findSolution(equation.reduced.coeffs);
            return solution;

        } else {
            errorHandler.invalidEquation();
        }
}

casper.test.begin("REGEXP TEST", 13, function(test) {
	test.assert(regexp.isNum.test("123456"), "isNUm : 123456");
	test.assert(regexp.isNum.test("-123456"), "isNUm : -123456");
	test.assertNot(regexp.isNum.test("123a56"), "isNum : 123a56");
	test.assertEquals(regexp.getExposants.exec("X^-1")[1], "-1");
	test.assertNot(regexp.isNum.test("123a56"), "isNum : 123a56");
    test.assert(regexp.isEquationValid.test("5 * X^0 + 4 * X^1 - 9 * X^2 = 1 * X^2"), "isEquationValid : 5 * X^0 + 4 * X^1 - 9 * X^2 = 1 * X^2");
    test.assertNot(regexp.isEquationValid.test("A * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^2"), "isEquationValid : A * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^2");
    test.assertNot(regexp.isEquationValid.test("5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^B"), "isEquationValid : 5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^B");
    test.assert(regexp.isEquationValid.test("5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^2"), "isEquationValid : 5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^2");
    test.assert(regexp.isEquationValid.test("5 *X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^2"), "isEquationValid : 5 *X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^2");
    test.assert(regexp.isEquationValid.test("5*X^0+4*X^1-9.3*X^2=1*X^2"), "isEquationValid : 5*X^0+4*X^1-9.3*X^2=1*X^2");
    test.assert(regexp.getCoefficient.test("5 * X^2"), "getCoefficient : 5 * X^2");
    test.assert(regexp.getCoefficient.test("5*X^2"), "getCoefficient : 5*X^2");

	test.done();
});

casper.test.begin("PROCESSING TEST", 1, function(test){
    test.assertEquals(main("5 * X^0 + 4 * X^1 = 4 * X^0"), { 'x' : -0.25 });
    test.done();
});
