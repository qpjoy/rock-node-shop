const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
class User {
    contructor(name, email, id){
        this.name = name;
        this.email = email;
        this.id = id ? new mongodb.ObjectId(id) : null;
    }
    save(){
        const db = getDb();
        let opDb;
        if(this._id){

        }
        else {
            opDb = db.collection('users').insertOne(this);
        }
        return opDb.then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
    }
    static findById(id){
        const db = getDb();
        return db.collection('users').findOne({_id : new mongodb.ObjectId(id)});
        
    }
}
module.exports = User;