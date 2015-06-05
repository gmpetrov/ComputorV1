exports.create = {
	getExposants: new RegExp('X\\^(\\S+)+', 'g'),
	isNum: new RegExp('^-?\\d+$')
};