var mysql = require('mysql');

module.exports.getDeck = getDeck;
module.exports.getUserDecks = getUserDecks;
module.exports.registerUser = registerUser;

function runQuery(sqlString, callback,method){
    var con = mysql.createConnection({
        host: "34.227.68.162", 
        user: "hs_user",
        password: "hearthstone",
        database: "hs_decks"
      });

    con.connect((err) => {
      if (err) {
        console.log('Connection Error');
        throw err;
      }

      console.log('Connected!');
      
        con.query(sqlString, (err, result) => {
          if (err) {
            console.log('Query Error');
            throw err;
          }
          if(method==="GET"){
            callback(result);
          }else if(method==="POST"){
            let response='posted';

            callback(response);
          }
        });
      
    });
}





function getDeck(deckID,callback){
    var sqlQuery = 'SELECT cardData FROM decks \
                    WHERE ID=\'' + deckID + '\';'; //consider adding LIMIT 1 to return inner JSON
    var result = runQuery(sqlQuery,callback,"GET");
    //return result;
}

function getUserDecks(params, callback){
    var sqlQuery = 'SELECT ID FROM decks \
                    WHERE userID=\'' + params['userid'] + '\';';
    var result = runQuery(sqlQuery,callback,"GET");
    //return result;
}

function registerUser(params, callback){
    var sqlQuery = 'INSERT INTO users (username, password) \
                    VALUES (\'' + params['username'] + '\', \'' + params['password'] + '\');'
    runQuery(sqlQuery, callback,"POST");
}

function verifyUser(params){
}

function deleteDeck(params){
}

function saveDeck(params){
} 



//registerUser('maple', 'syrup');
