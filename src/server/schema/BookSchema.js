const mongoose =require('mongoose');
module.exports=new mongoose.Schema({//书籍
    title:{type:String,unique:true},
    cover:String,
    bookId:String,
    updateTime:Date,
    updateChapter:String,
    
})