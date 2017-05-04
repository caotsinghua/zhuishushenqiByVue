const express = require('express');
const cookies=require('cookies');
const mongoose =require('mongoose')
const bodyParser =require('body-parser')
const cors =require('cors')
const main =require('./router/main')
const api =require('./router/api')
let app=express();
//使用cookies

app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json());
app.use(cors({
    origin:'*',
    credentials:true,
    allowedHeaders:['Content-Type', 'Authorization','Accept','X-Requested-With']
}));

app.use(function(req,res,next){
    req.cookies=new cookies(req,res)
    if(req.cookies.get('userInfo')){
        console.log(req.cookies.get('userInfo'))
    }else{
        console.log("no cookie")
    }
    next();
})
app.use('/',main);
app.use('/api',api);

mongoose.connect('mongodb://localhost:27019/zhuishu',function(err){
    if(err){
        console.log("连接数据库失败i")
    }else{
        app.listen(3000,function(err){
            if(err){
                console.log("开启服务器失败")
            }else{
                console.log("连接数据库成功")
                console.log("server listening on port:3000")
            }
        })
    }
})

