/**
 * Created by gpetrov on 05/06/15.
 */

exports.create = {
    dump : function(object){
        console.log(JSON.stringify(object, null, '\t'));
    }
};