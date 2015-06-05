exports.create = {
	isNum: new RegExp('^-?\\d+$'),
	isEquationValid : new RegExp('^\\d+.*=.*\\d+$'),
	getExposants: new RegExp('X\\^(\\S+)+', 'g'),
	getLhs : new RegExp('^(.*)='),
	getRhs : new RegExp('.*=(.*)$')
};