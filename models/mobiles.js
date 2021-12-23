const mongoose = require('mongoose')

const mobileSchema=mongoose.Schema({
    name:String,
    brand:String,
    price:Number,
    rating:Number,
})

module.exports=mongoose.model('Mobiles',mobileSchema)