const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    reportingPersonName: {
        type: String,
        required: true
    },
    reportersPhoneNumber: {
        type: Number
    },
    placeOfLost: {
        type: String,
        required: true
    },
    brand: {
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
    }
})

const Item = new mongoose.model('Item', ItemSchema);

module.exports = Item;