var sql = require('./sql.js')
var fs = require('fs');

module.exports.handleRequest = function handleRequest(url, callback) {
    let params = splitParams(url);
    console.log(url);
    if(!url.includes('?')){
        if(url==="/")
            url+="index.html";
        try{
            acallback(fs.readFileSync("./build"+url));
        }catch(e){
            callback('404');
        }
    }
    if(url.includes('getdeck')) {
        sql.getDeck(params, callback);
    }
    else if(url.includes('getuserdecks')) {
        sql.getUserDecks(params, callback);
    }
    else if(url.includes('savedeck')) {
        sql.saveDeck(params, callback);
    }
    else if(url.includes('deletedeck')) {
        sql.deleteDeck(params, callback);
    }
    else if(url.includes('registeruser')) {
        sql.registerUser(params, callback);
    }
    else if(url.includes('verifyuser')) {
        sql.verifyUser(params, callback);
    } else {
        let error = new Error();
        error.code = 'ER_FUNCTION_NOT_FOUND';
        error.message = 'specified function was not found';
        return callback(error, null);
    }
}

function splitParams(url){
    let params=[];
    let paramString=url.split('?')[1];
    if(paramString!=undefined){
        let array=paramString.split('&');
        for(let i=0;i<array.length;i++){
            pair=array[i].split('=');
            if(pair[0]!==undefined){
                if(pair[1]===undefined)
                    pair[1]='';
                    params[pair[0].toLowerCase()]=pair[1].toLowerCase();
            }
            console.log("   "+pair[0]+"="+pair[1]);
        }
    }
    return params;
}