var system = require('system');
// var casper = require('casper').create();

// if (system.args.length === 1) {
// 	console.log('Try to pass some args when invoking this script!');
// } else {
// 	system.args.forEach(function (arg, i) {
// 			console.log(i + ': ' + arg);
// 	});
// }

var regexp = {
	getExposants: new RegExp('X\\^(\\S+)+', 'g'),
	isNum: new RegExp('^\\d+$')
}

var errorHandler = {
	maxExposant: 2,
	invalidEquation: function() {
		console.log("Invalid equation");
		phantom.exit();
	},
	invalidExposant: function() {
		console.log("Invalid exposant");
		phantom.exit();
	},
	exposantTooHigh: function() {
		console.log("Exposant is too high, max is " + this.maxExposant);
		phantom.exit();
	},
	checkExposant: function(exposant) {
		if (!regexp.isNum.test(exposant))
			this.invalidExposant();
		else if (regexp.isNum.test(exposant) && parseInt(exposant) > 2)
			this.exposantTooHigh();
		else
			console.log(exposant);
	}
};

var equation = {
	findSolutions: function() {
		console.log("Function find solutions");
	}
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

exports.create = {
	hello : function(){
		return "hello";
	}
};

// phantom.exit();