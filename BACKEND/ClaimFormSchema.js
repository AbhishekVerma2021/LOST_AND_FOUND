const mongo = require('mongoose');

const FORMSCHEMA = new mongo.Schema({
    name: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    subCatagory: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    color: {
        type: String,
        rquired: true
    },
    placeLost: {
        type: String,
        required: true
    },
    itemDescription: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongo.model('claim', FORMSCHEMA)