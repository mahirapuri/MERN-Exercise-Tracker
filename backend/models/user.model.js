const mongoose = require('mongoose') //we require mongoose

const Schema= mongoose.Schema; //general format of schema

const userSchema = new Schema({  //userSchema is the name and it has
    username: {                  // only has a single field i.e username
        type: String, 
        required: true,
        unique:true,               //validations
        trim: true,
        minlength:3
    },
}, {
    timestamps:true,  //automatically creates fields for when
});                  //it was created and modified  

const User = mongoose.model('User',userSchema); //model name User

module.exports=User; //export

