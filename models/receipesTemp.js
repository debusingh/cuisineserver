const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const receipeTSchema = new Schema({

    
    name : {

        type: String,
        required : true
    },
    region : {

        type: String,
        required : true
    },
    type : {

        type: String,
        required : true
    },
    vegeterian : {

        type: Boolean,
        required : true
    },
    ingredents : {

        type: String,
        required : false
    }, videoLink : {

        type: String,
        required : true,
        unique : true
    },
    userMail : {

        type: String,
        required : true
    }
},{
    timestamps:true
});

var ReceipesTemp = mongoose.model('ReceipesTemp', receipeTSchema);

module.exports = ReceipesTemp;