const mongodb = require('mongodb')
const getDb = require('../util/database').getDb;
class Product{
    constructor(title, price, description, imageUrl, id){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = new mongodb.ObjectId(id);
    }
    save(){
        const db = getDb();
        let opDb;
        if(this._id){
            opDb = db.collection('products').updateOne({ _id: this._id }, { $set: this });
        }
        else {
            opDb = db.collection('products').insertOne(this);
        }
        return opDb
        .then(product => {
            console.log(product);
        })
        .catch(err => {
            console.log(err);
        })

    }
    static fetchAll(){
        const db = getDb();
        return db.collection('products').find().toArray()
        .then(products => {
            return products;
        })
        .catch(err => {
            console.log(err);
        })
    }
    static findById(id){
        const db = getDb();
        return db.collection('products').find({ _id: new mongodb.ObjectId(id) }).next()
        .then(product => product)
        .catch(err => console.log(err))
    }
}
module.exports = Product;