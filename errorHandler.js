var PrettyError = require('pretty-error'),
	regexp 		= require('./regexp').create,
	MACRO		= require('./MACRO').create;

exports.create = {
	err : new PrettyError(),
	maxExposant: MACRO.maxExposant,
	invalidEquation: function() {
		console.log(this.err.render(new Error('Invalid equation')));
		process.exit();
	},
	invalidExposant: function() {
		console.log(this.err.render(new Error("Invalid exposant")));
		process.exit();
	},
	exposantTooHigh: function() {
		console.log(this.err.render(new Error("Exposant is too high, max is " + this.maxExposant)));
		process.exit();
	},
	usage : function(){
		console.log(this.err.render(new Error("[USAGE] - node computor.js [POLYNOMIAL EQUATION]")));
	},
	checkExposant: function(exposant) {
		if (!regexp.isNum.test(exposant))
			this.invalidExposant();
		else if (regexp.isNum.test(exposant) && parseInt(exposant) > this.maxExposant)
			this.exposantTooHigh();
	}
};