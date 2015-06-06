/**
 * Created by gpetrov on 05/06/15.
 */

var regexp  = require('./regexp').create;

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
        return matches;
    },
    rhsToLhs : function(polynomes){
        console.log('rhsToLhs');
        var rhs = null;
        polynomes.forEach(function(elem, index){

            var coeff = parseFloat(regexp.getCoefficient.exec(elem)[1]) * -1;
            var exposant = regexp.getExposants.exec(elem)[1];
            var polynome = coeff + " * X^" + exposant;
            polynomes[index] = polynome;
            if (rhs == null)
                rhs = polynome;
            else
                rhs = rhs + " " + polynome;
        });
        return rhs;
    },
    addPolynomesFromString : function(equation){

    }
};