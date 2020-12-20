const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const receipeSchema = new Schema({

    
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
    }
},{
    timestamps:true
});

var Receipes = mongoose.model('Receipe', receipeSchema);

module.exports = Receipes;