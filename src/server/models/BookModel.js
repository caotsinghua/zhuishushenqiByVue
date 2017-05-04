const mongoose =require('mongoose')
const BookSchema=require('../schema/BookSchema')
module.exports=mongoose.model('BookModel',BookSchema);