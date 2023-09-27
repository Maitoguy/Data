const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({

    id:{
        type: String,
        required: true
    },

    title:{
        type: String,
        required: true
    },

    firstName:{
        type: String,
        required: true
    },

    lastName:{
        type: String,
        required: true
    },

    picture:{
        type: String,
        required: true
    }

},{
    timestamps: true
});

const Data = mongoose.model('Data' , dataSchema);

module.exports = Data;