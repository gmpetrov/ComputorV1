exports.create = {
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