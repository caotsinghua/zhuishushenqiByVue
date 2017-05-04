const express = require('express');
const UserModel = require('../models/UserModel')
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
  }).then(user => {
    if (!user) {
      responseData.success = false;
      responseData.message = '登录失败,请检查用户名密码'
      res.json(responseData)
      return;
    } else {
      responseData.success = true;
      responseData.message = '登录成功'
      let userInfo={
        username:user.username,
        userid:user._id
      }
      req.cookies.set('userInfo',JSON.stringify(userInfo),{httpOnly:false});
      res.json(responseData);
      return;
    }
  }).catch(err => {
    responseData.success = false;
      responseData.message = '登录失败,请检查用户名密码'
      res.json(responseData)
      return;
  })
})
//logout
router.post('/logout',(req,res)=>{
  req.cookies.set("userInfo",null);
  responseData.success=true;
  responseData.message="退出成功"
  res.json(responseData);
})
//register
router.post('/register', (req, res) => {
  let user = {
    username: req.body.username,
    password: req.body.password,
    repassword: req.body.repassword
  }
  console.log(user);
  if (user.password != user.repassword) {
    responseData.success = false;
    responseData.message = '两次密码不一致!'
    res.json(responseData);
    return;
  }
  UserModel.findOne({
    username:user.username
  }).then(function(info){
    if(info){
      responseData.message="用户名已存在";
      responseData.success=false;
      res.json(responseData);
      return;
    }else{
      let newUser=new UserModel({
        username:user.username,
        password:user.password
      })
      return newUser.save();
    }
  }).then(function(info){
    if(info){
      responseData.success=true;
      responseData.message="注册成功"
      let userInfo={
        username:info.username,
        userid:info._id
      }
      req.cookies.set('userInfo',JSON.stringify(userInfo),{httpOnly:false});
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
  UserModel.findById(userId).then(data=>{
    userInfo=data;
    res.json(userInfo)
  }).catch(err=>{
    console.log(err);
  })
})
//追书
router.post('/addbook',function(req,res){
  let bookId=req.body.id;
  let userId=req.cookies;
  res.json(userId)
})
module.exports = router;
