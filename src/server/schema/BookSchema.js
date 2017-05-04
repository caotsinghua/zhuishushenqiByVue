const mongoose =require('mongoose');
module.exports=new mongoose.Schema({//书籍
    title:String,
    cover:String,
    bookId:String,
    updateTime:Date,
    updateChapter:String,
    lastReadTime:Date
})