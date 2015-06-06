exports.create = {
	isNum: new RegExp('^-?\\d+$'),
	isEquationValid : new RegExp('^((?:\\d+(?:\\.\\d+)?(?:\\s+)?\\*(?:\\s+)?X\\^\\d+|\\d+(?:\\.\\d+)?)(?:(?:\\s+)?\\+(?:\\s+)?|(?:\\s+)?\\-(?:\\s+)?)?)+(?:\\s+)?=(?:\\s+)?((?:\\d+(?:\\.\\d+)?(?:\\s+)?\\*(?:\\s+)?X\\^\\d+|\\d+(?:\\.\\d+)?)(?:(?:\\s+)?\\+(?:\\s+)?|(?:\\s+)?\\-(?:\\s+)?)?)+$'),
	getExposants: new RegExp('X\\^(\\S+)+', 'g'),
	getLhs : new RegExp('^(.*)='),
	getRhs : new RegExp('.*=(.*)$'),
	getPolynomes : new RegExp('(\\d+(?:\\.\\d+)?\\s+?\\*\\s+?X\\^\\d+|\\d+)', 'g'),
	getCoefficient : new RegExp('(\\d+)\\s+?\\*\\s+?X\\^\\d+')
};