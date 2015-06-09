var	regexp 		= require('./regexp'),
	MACRO		= require('./MACRO');

module.exports = (function(){
	return {
		//err : new PrettyError(),
		maxExposant: MACRO.maxExposant,
		invalidEquation: function() {
			//console.log(this.err.render(new Error('Invalid equation')));
			console.log('Invalid equation');
			process.exit();
		},
		invalidExposant: function() {
			console.log("Invalid exposant");
			process.exit();
		},
		exposantTooHigh: function() {
			console.log("Exposant is too high, max is " + this.maxExposant);
			process.exit();
		},
		usage : function(){
			console.log("[USAGE] - node computor.js [POLYNOMIAL EQUATION]");
		},
		checkExposant: function(exposant) {
			if (!regexp.isNum.test(exposant))
				this.invalidExposant();
			else if (regexp.isNum.test(exposant) && parseInt(exposant) > this.maxExposant)
				this.exposantTooHigh();
		}
	};
})();