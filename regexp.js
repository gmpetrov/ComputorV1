module.exports = (function(){
	return {
		isNum: new RegExp('^-?\\d+(?:\\.\\d+)?$'),
			isEquationValid : new RegExp('^((?:\\-?\\d+(?:\\.\\d+)?(?:\\s+)?\\*(?:\\s+)?X\\^\\d+|\\d+(?:\\.\\d+)?)(?:(?:\\s+)?\\+(?:\\s+)?|(?:\\s+)?\\-(?:\\s+)?)?)+(?:\\s+)?=(?:\\s+)?((?:\\d+(?:\\.\\d+)?(?:\\s+)?\\*(?:\\s+)?X\\^\\d+|\\-?\\d+(?:\\.\\d+)?)(?:(?:\\s+)?\\+(?:\\s+)?|(?:\\s+)?\\-(?:\\s+)?)?)+$'),
		getExposants: new RegExp('X\\^(\\-?\\d+)+', 'g'),
		getLhs : new RegExp('^(.*)='),
		getRhs : new RegExp('.*=(.*)$'),
		getPolynomes : new RegExp('((?:-(?:\\s+)?)?\\d+(?:\\.\\d+)?(?:\\s+)?\\*(?:\\s+)?X\\^\\d+|(?:-(?:\\s+)?)?\\d+)', 'g'),
		getCoefficient : new RegExp('((?:-(?:\\s+)?)?\\d+(?:\\.\\d+)?)(:?\\s+)?\\*(?:\\s+)?X\\^\\d+|\\d+(?:\\.\\d+)?')
	};

})();