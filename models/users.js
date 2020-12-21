const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const regUserSchema = new Schema({

    
    name : {

        type: String,
        required : true
    },
    userMail : {

        type: String,
        required : true,
        unique: true
    }
},{
    timestamps:true
});

var RegUsers = mongoose.model('RegUser', regUserSchema);

module.exports = RegUsers;