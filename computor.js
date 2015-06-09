var args 			= process.argv,
	regexp 			= require('./regexp').create,
	errorHandler 	= require('./errorHandler').create,
	utils			= require('./utils').create;

require('pretty-error').start();

var equation = {

};

function printSolution(reducedForm, degree, solution){
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
		console.log("The solution is:");
		if (degree == 0){
			console.log(solution.x);
		}
	}
}

function findSolution(coeffs){
	var degree = coeffs.length - 1;
	if (degree == 2){ // CASE OF DEGREE 2 EQUATION
		//∆ = b2 - 4ac
		var a = coeffs[2];
		var b = coeffs[1];
		var c = coeffs[0];
		var delta = (b * b) - (4 * a * c);
		if (delta > 0){
			var x1 = (-1 * (b) - Math.sqrt(delta)) / (2 * a);
			var x2 = (-1 * (b) + Math.sqrt(delta)) / (2 * a);
			return {'delta' : delta, 'x1' : x1, 'x2' : x2};
		}
		else if (delta === 0){
			var x = (-1 * b) / (2 * a);
			return {'delta' : delta, 'x' : x};
		}
		else if (delta < 0){
			var x1 = (-1 * b) + " - " + delta + "i / " + 2 * a;
			var x2 = (-1 * b) + " + " + delta + "i / " + 2 * a;
			return {'delta' : delta, 'x1' : x1, 'x2' : x2};
		}
	}
	else if (degree == 0){
		return {'x' : coeffs[0]}
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
			var solution = findSolution(equation.reduced.coeffs);
			printSolution(equation.reduced.toString, degree, solution);

		} else {
			errorHandler.invalidEquation();
		}
	}
	else
		errorHandler.usage();
}

main();
