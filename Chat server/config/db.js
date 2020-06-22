const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');


const DBConnection = () => {
    try {
        mongoose.connect(db, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('MongoDb connected');
    } catch (err) {
        console.log(err);
    }
}

module.exports = DBConnection;