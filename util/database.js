const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const MongoConnect =  (callback) => {
    MongoClient.connect('mongodb://localhost:27017/nodeshop')
    .then(client => {
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    })
}
const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database found';
}
exports.MongoConnect;
exports.getDb = getDb;