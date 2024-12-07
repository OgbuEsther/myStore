//import
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    address: String,
    phone: String,
    password: String,
    role: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Books',bookSchema);