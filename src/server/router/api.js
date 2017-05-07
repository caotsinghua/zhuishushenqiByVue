const express = require('express');
const UserModel = require('../models/UserModel')
const BookModel = require('../models/BookModel')
const http = require('http')

let router = express.Router();
let responseData = {
  success: true,
  message: ''
}
// login
router.post('/login', (req, res) => {
  let username = req.body.username,
    password = req.body.password
  //前端判断合法
  UserModel.findOne({
    username: username,
    password: password
  }, (err, user) => {
    if (!user) {
      responseData.success = false;
      responseData.message = '登录失败,请检查用户名密码'
      res.json(responseData)
      return;
    } else {
      responseData.success = true;
      responseData.message = '登录成功'
      let userInfo = {
        username: user.username,
        userid: user._id
      }
      req.cookies.set('userInfo', JSON.stringify(userInfo), {
        httpOnly: false
      });
      res.json(responseData);
      return;
    }
  })
})
//logout
router.post('/logout', (req, res) => {
  req.cookies.set("userInfo", null);
  responseData.success = true;
  responseData.message = "退出成功"
  res.json(responseData);
})
//register
router.post('/register', (req, res) => {
  let user = {
    username: req.body.username,
    password: req.body.password,
    repassword: req.body.repassword
  }
  if (user.password != user.repassword) {
    responseData.success = false;
    responseData.message = '两次密码不一致!'
    res.json(responseData);
    return;
  }
  UserModel.findOne({
    username: user.username
  }).then(function (err, info) {
    if (info) {
      responseData.message = "用户名已存在";
      responseData.success = false;
      res.json(responseData);
      return;
    } else {
      let newUser = new UserModel({
        username: user.username,
        password: user.password
      })
      return newUser.save();
    }
  }).then(function (info) {
    if (info) {
      responseData.success = true;
      responseData.message = "注册成功"
      let userInfo = {
        username: info.username,
        userid: info._id
      }
      req.cookies.set('userInfo', JSON.stringify(userInfo), {
        httpOnly: false
      });
      res.json(responseData);
      return;
    }
  }).catch(err => {
    responseData.success = false;
    responseData.message = '注册失败'
    res.json(responseData)
    return;
  })
})

//获取用户信息
router.get('/user', function (req, res) {
  let userId = req.query.id;
  let userInfo;
  UserModel.findOne({
    _id: userId
  }).populate('booklist').exec(function (err, data) {
    if (err) {
      throw err;
    } else {
      res.json(data)
    }
  })
})
//追书
router.post('/addbook', function (req, res) {
  let bookId = req.body.id; //书籍id
  let userId = req.body.userid;

  let msg = '';
  http.get("http://api.zhuishushenqi.com/book/" + bookId, function (req2, res2) {
    req2.on('data', function (data) {
      msg += data;
    })
    req2.on('end', function () {
      msg = JSON.parse(msg);
      let img_url = "http://statics.zhuishushenqi.com";
      let book = {
        title: msg.title,
        cover: img_url + msg.cover,
        bookId: msg._id,
        updateTime: msg.updated,
        updateChapter: msg.lastChapter
      }
      BookModel.findOne({
        bookId: book.bookId
      }, function (err, data) {
        if (err) {
          throw err;
        }
        if (!data) {
          book = (new BookModel(book));
          book.save(); //保存到书籍库中
        } else {
          console.log('书存在')
          book = data;
        }
      })
      //添加到个人书单
      UserModel.findById(userId, function (err, user) {
        let has = false;
        user.booklist.forEach((item) => {
          if (item.toString() == book._id) {
            
            has = true;
            return;
          }
        })
        if (!has) {
          user.booklist.push(book);
          user.save(function (err) {
            if (err) {
              return err;
            } else {
              res.json({
                success: true,
                message: '追书成功'
              })
            }
          })
        }else{
          console.log('已追此书')
          res.json({
              success: false,
              message: '已追了此书'
            })
        }

      })
    })
  })
})
module.exports = router;
