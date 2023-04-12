const mongoose=require('mongoose')

const Product=mongoose.model('Product',{

    title:{ type:String},
    description:{type:String},
    Price:{type:Number},
    Img:{type:String}

})

module.exports=Product