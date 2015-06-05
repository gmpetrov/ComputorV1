var system = require('system');
var regexp = require('./regexp').create;
var errorHandler = require('./errorHandler').create;

var equation = {
};

if (system.args[1]) {
	var eq = system.args[1];
	if (/^(.*)=/.exec(eq)) {
		var lhs = /^(.*)=/.exec(eq)[1].trim();
		var rhs = /.*=(.*)$/.exec(eq)[1].trim();
		equation.eq = system.args[1].trim();
		equation.lhs = lhs;
		equation.rhs = rhs;

		var matches = [],
			match;
		while (match = regexp.getExposants.exec(eq)) {
			errorHandler.checkExposant(match[1]);
		}
		console.log("ALL IS OK");

	} else {
		errorHandler.invalidEquation();
	}
}

phantom.exit();