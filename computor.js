var args 			= process.argv,
	regexp 			= require('./regexp'),
	errorHandler 	= require('./errorHandler'),
	utils			= require('./myUtils'),
	chalk		 	= require('chalk');

require('pretty-error').start();

var equation = {

};

function printSolution(reducedForm, degree,solution){

	if (solution.degree)
		degree = solution.degree;

	console.log("Reduced form: " + reducedForm);
	console.log("Polynomial degree: " + degree);

	if (degree == 2 && solution.delta > 0) {
		console.log("Discriminant is strictly positive, the two solutions are:");
		console.log(solution.x1);
		console.log(solution.x2);
	}
	else if (degree == 2 && solution.delta < 0) {
		console.log("Discriminant is strictly negative, the two complex solutions are:");
		console.log(solution.x1);
		console.log(solution.x2);
	}
	else if ((degree == 2 && solution.delta == 0)) {
		console.log("The solution is:");
		console.log(solution.x1);
	}
	else if (degree < 2){
		console.log(chalk.green(
			'I am a green line ' +
			chalk.blue.underline.bold('with a blue substring') +
			' that becomes green again!'
		));
		console.log("The solution is:");
		console.log(solution.x);
	}
}

function main() {
	if (args[2]) {
		var eq = args[2];
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
			printSolution(equation.reduced.toString, degree, solution);

		} else {
			errorHandler.invalidEquation();
		}
	}
	else
		errorHandler.usage();
}

main();
