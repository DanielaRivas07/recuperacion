const mongoose = require('mongoose');
require ('dotenv').config

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Se conecto la base datos`);
    } catch (error) {
        console.log(error)
    }
};

module.exports = connectDB;
