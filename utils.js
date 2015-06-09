/**
 * Created by gpetrov on 05/06/15.
 */

var regexp  = require('./regexp').create;
var MACRO  = require('./MACRO').create;

exports.create = {
    dump : function(object){
        console.log(JSON.stringify(object, null, '\t'));
    },
    getRegexpMatches : function(src){
        var matches = [],
            match,
            degree = 0;
        while (match = regexp.getPolynomes.exec(src)) {
            matches.push(match[1]);
        }
        regexp.getPolynomes.lastIndex = 0;
        return matches;
    },
    rhsToLhs : function(polynomes){
        var rhs = null;
        console.log(polynomes);
        polynomes.forEach(function(elem, index){
            regexp.getCoefficient.lastIndex=0
            regexp.getExposants.lastIndex=0

            if (regexp.isNum.test(elem))
                var coeff = parseFloat(elem) * -1;
            else
                var coeff = parseFloat(regexp.getCoefficient.exec(elem)[1]) * -1;
            if (regexp.isNum.test(elem))
                var exposant = 0;
            else
                var exposant = regexp.getExposants.exec(elem)[1];
            var polynome = coeff + " * X^" + exposant;
            polynomes[index] = polynome;
            if (rhs == null)
                rhs = polynome;
            else
                rhs = rhs + " " + polynome;

            console.log(polynomes);
        });
        return rhs;
    },
    addPolynomesFromString : function(string, degree){
        var polynomes = this.getRegexpMatches(string);

        polynomes.forEach(function(elem, index){
            regexp.getExposants.lastIndex = 0;
            regexp.getCoefficient.lastIndex = 0;
            var exposant = parseInt(regexp.getExposants.exec(elem)[1]);
            var coeff    = parseFloat(regexp.getCoefficient.exec(elem)[1]);
            polynomes[index] = { 'coefficient' : coeff, 'exposant' : exposant };
        });

        var ar = [];
        for (i = 0; i <= degree; i++){ar[i] = 0;}
        for (i = 0; i <= degree; i++){
            polynomes.forEach(function(elem, index){
                if (elem.exposant === i){
                    ar[i] += elem.coefficient;
                }
            });
        }
        var result = null;
        for (i = degree; i >= 0; i--){
            if (ar[i] != 0) { // IF ar[i] == 0 THEN IT MEANS THAT THE POLYNOME IS EQUAL TO 0, SO IT CAN BE SKIPPED
                if (!result)
                    result = ar[i] + " * X^" + i;
                else {
                    if (ar[i] >= 0)
                        result += (" + " + ar[i] + " * X^" + i);
                    else
                        result += (" " + ar[i] + " * X^" + i);
                }
            }
        }
        result += " = 0";
        return { 'toString' : result, 'coeffs' : ar };
    }
};