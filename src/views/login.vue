<template>
    <div>
        <div class="header">
            <img src="../../static/img/logo.png" alt="" class="logo">
            <h1 class="title">VueBook</h1>
        </div>
        <transition enter-active-class="animated bounceInRight" leave-active-class="animated fadeOutLeft" mode="out-in">
            <div class="login-wrap" v-if="goLog" key="login">
                <h1 class="title">登录</h1>
                <el-form :model="loginForm" ref="loginForm" label-width="80px" label-position="left" :rules="rules">
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="loginForm.username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login('loginForm')">登陆</el-button>
                        <el-button @click="resetForm('loginForm')">重置</el-button>
                    </el-form-item>
                </el-form>
                <p class="animated fadeIn errmsg" v-if="showErr">{{errorMsg}}</p>
                <a href="javascript:;" class="href" @click="goLog=!goLog">没有账号，去注册>></a>
    
            </div>
            <div class="register-wrap" v-else key="register">
                <h1 class="title">注册</h1>
                <el-form :model="registerForm" ref="registerForm" label-width="80px" label-position="left" :rules="rules">
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="registerForm.username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="repassword">
                        <el-input type="password" v-model="registerForm.repassword" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="register('registerForm')">注册</el-button>
                        <el-button @click="resetForm('registerForm')">重置</el-button>
                    </el-form-item>
                </el-form>
                <p class="animated fadeIn errmsg" v-if="showErr">{{errorMsg2}}</p>
                <a href="javascript:;" class="href" @click="goLog=!goLog">已有账号，去登录>></a>
    
            </div>
    
        </transition>
    
    </div>
</template>
<script>
import apis from '../store/apis.js'
export default {
    data() {
        let validateRepass = (rule, value, cb) => {
            if (!value) {
                return cb(new Error("密码不能为空"))
            }
            if (value != this.registerForm.password) {
                return cb(new Error("两次密码不一致"))
            }
            cb();

        }
        return {
            loginForm: {
                username: '',
                password: ''
            },
            registerForm: {
                username: '',
                password: '',
                repassword: ''
            },
            rules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { min: 3, max: 8, message: '长度在3-8之间', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { min: 3, message: '长度至少3', trigger: 'blur' }
                ],
                repassword: [
                    { validator: validateRepass, trigger: 'blur' }
                ]
            },
            goLog: true,
            errorMsg: '',
            errorMsg2: '',
            showErr: false,
        }
    },
    computed: {
        isLogged() {
            return this.$store.state.logged;
        }
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        login(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {//合法
                    let form = this.loginForm;
                    this.$http.post(apis.login, form).then(res => {
                        if (res.data.success) {
                            this.errorMsg = res.data.message;
                            this.showErr = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.showErr = false;
                            }, 2000);
                            this.$router.push('/books');
                        } else {
                            this.resetForm(name)
                            this.errorMsg = res.data.message;
                            this.showErr = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.showErr = false;
                            }, 2000);
                        }
                    }).catch(err => {
                        this.resetForm(name)
                        this.errorMsg = "登录失败："+err;
                        this.showErr = true;
                        setTimeout(() => {
                                this.errorMsg = '';
                                this.showErr = false;
                            }, 2000);
                        return;
                    })
                }

            })

        },
        register(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {//合法
                    let form = this.registerForm;
                    this.$http.post(apis.register, form).then(res => {
                        if (res.data.success) {
                            this.errorMsg2 = res.data.message;
                            this.showErr = true;
                            setTimeout(() => {
                                this.errorMsg2 = '';
                                this.showErr = false;
                            }, 2000);
                            this.goLog = true;

                        } else {
                            this.resetForm(name)
                            this.errorMsg2 = res.data.message;
                            this.showErr = true;
                            setTimeout(() => {
                                this.errorMsg2 = '';
                                this.showErr = false;
                            }, 2000);
                        }
                    }).catch(err => {
                        this.resetForm(name)
                        this.errorMsg2 ="注册失败："+err;
                        this.showErr = true;
                        setTimeout(() => {
                                this.errorMsg2 = '';
                                this.showErr = false;
                            }, 2000);
                        return;
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.header {
    text-align: center;
    padding: 6rem 0;
    box-shadow: 1px 1px 1px #ccc;
    .logo {
        width: 6rem;
    }
    .title {
        color: #fff;
        font-size: 1.5rem;
    }
}

.href {
    font-size: 0.8rem;
    text-align: center;
    color: #f00;
    text-decoration: underline;
    margin-left: 80px;
}

.login-wrap,
.register-wrap {
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;

    .title {
        text-align: center;
        margin-bottom: 1rem;
    }
    .errmsg {
        color: blue;
        font-size: 0.8rem;
        margin-left: 80px;
        margin-bottom: 1rem;
    }
}
</style>