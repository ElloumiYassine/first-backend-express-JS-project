const mongoose=require('mongoose')

const User=mongoose.model('user',{
    fName:{
        type: String
    },
    lName:{
        type:String
    },
    age:{
        type:Number
    },
    email:{
        type:String
    },
    pwd:{
        type:String
    },

})

module.exports=User;