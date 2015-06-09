/**
 * Created by gpetrov on 05/06/15.
 */

var regexp  = require('./regexp');
var MACRO  = require('./MACRO');

module.exports = (function(){
    return {
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
        },
        findSolution : function(coeffs){
            var degree = coeffs.length - 1;
            if (degree == 2){ // CASE OF DEGREE 2 EQUATION
                //∆ = b2 - 4ac
                var a = coeffs[2];
                var b = coeffs[1];
                var c = coeffs[0];
                var delta = (b * b) - (4 * a * c);
                if (delta > 0){
                    var x1 = (-1 * (b) - Math.sqrt(delta)) / (2 * a);
                    var x2 = (-1 * (b) + Math.sqrt(delta)) / (2 * a);
                    return {'delta' : delta, 'x1' : x1, 'x2' : x2};
                }
                else if (delta === 0){
                    var x = (-1 * b) / (2 * a);
                    return {'delta' : delta, 'x' : x};
                }
                else if (delta < 0){
                    var x1 = (-1 * b) + " - " + delta + "i / " + 2 * a;
                    var x2 = (-1 * b) + " + " + delta + "i / " + 2 * a;
                    return {'delta' : delta, 'x1' : x1, 'x2' : x2};
                }
            }
            else if (degree < 2){
                if (degree == 1){
                    var a = coeffs[1];
                    var b = coeffs[0];
                    var x = (-1 * b) / a;
                    return {'x' : x};
                }
                return {'x' : coeffs[0]}
            }
        }
    };
})();