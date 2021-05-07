require('dotenv').config();
const mongoose = require('mongoose');

// Better Practice to hid the mongo url
const URL = process.env.MONGO_URL || 'mongodb://localhost:27017/crane2_Dev';
const configOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

mongoose.connect(URL, configOptions)
    .then(() => console.log('MongoDB successfully connected...'))
    .catch(err => console.log('MongoDB connection error:', err));

module.exports = {
    User: require('./user'),
}