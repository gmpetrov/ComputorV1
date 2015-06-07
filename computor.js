var args 			= process.argv,
	regexp 			= require('./regexp').create,
	errorHandler 	= require('./errorHandler').create,
	utils			= require('./utils').create;

var equation = {

};

function main() {
	if (args[2]) {
		var eq = args[2];
		if (regexp.isEquationValid.exec(eq)) {
			equation.eq = eq.trim();
			equation.lhs = regexp.getLhs.exec(eq)[1].trim();
			equation.rhs = regexp.getRhs.exec(eq)[1].trim();
			equation.lhsPolynomes = utils.getRegexpMatches(equation.lhs);
			equation.rhsPolynomes = utils.getRegexpMatches(equation.rhs);

			var matches = [],
				match,
				degree = 0;
			while (match = regexp.getExposants.exec(eq)) {
				errorHandler.checkExposant(match[1]);
				if (degree < parseInt(match[1]))
					degree = parseInt(match[1]);
				matches.push(match[1]);
			}
			equation.degree = degree;

			equation.reduced = equation.lhs + " " + utils.rhsToLhs(equation.rhsPolynomes);
			equation.polynomes = utils.getRegexpMatches(equation.reduced);

		} else {
			errorHandler.invalidEquation();
		}
	}
	else
		errorHandler.usage();
}

main();
