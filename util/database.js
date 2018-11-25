const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const MongoConnect =  (callback) => {
    MongoClient.connect('mongodb://localhost:27017/nodeshop')
    .then(client => {
        console.log('connected');
        callback(client);
    })
    .catch(err => {
        console.log(err);
    })
}
module.exports = MongoConnect;
