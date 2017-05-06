const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
  username: String,
  password: String,
  booklist: [ //正在追的书籍
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BookModel'
    }
  ]
})
