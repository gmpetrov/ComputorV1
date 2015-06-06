/**
 * Created by gpetrov on 05/06/15.
 */

var regexp = require('./regexp').create;

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
    }
};