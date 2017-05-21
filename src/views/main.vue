<template>
    <div class="main">
        <header class="appbar">
            <div class="header">
                <div class="container">
                    <el-row type="flex" justify="space-between" align="middle">
                        <el-col :span="8">
                            <p class="logo-title">追书神器</p>
                        </el-col>
    
                        <el-col :span="12" class="menu-btns">
                            <el-button type="primary" icon="menu"></el-button>
                            <el-button type="primary" icon="search"></el-button>
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link"><i class="el-icon-more"></i></span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item ><i class="el-icon-star-on el-icon--left"></i>{{userInfo.username}}</el-dropdown-item>
                                    <el-dropdown-item command="logout"><i class="el-icon-upload2 el-icon--left"></i>登出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                    </el-row>
                </div>
    
            </div>
            <div class="tabs-wrap">
                <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
                    <el-tab-pane v-for="(tab,index) in tabs" :label="tab.name" :name="tab.name" :key="tab.index"></el-tab-pane>
    
                </el-tabs>
            </div>
        </header>
        <div class="tab-show">
            <transition mode="out-in" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight" class="fade-animate">
                <router-view></router-view>
            </transition>
    
        </div>
    </div>
</template>

<script>
import util from '../util.js'
export default {
    data() {
        return {
            tabs: [{
                name: '追书',
                path: '/books'
            }, {
                name: '社区',
                path: '/communities'
            }, {
                name: '发现',
                path: '/find'
            }],
            userInfo: {}
        }
    },
    computed: {
        activeName() {
            let index = this.$store.state.tabIndex;
            return this.tabs[index].name;
        }
    },
    created(){
        this.getUserInfo("userInfo");
    },
    components: {

    },
    methods: {
        handleClick(tab, event) { //切换tab
            let path = this.tabs[tab.index].path;
            let index = tab.index;
            this.$store.commit('changeTab', index)
            this.$router.push(path);
        },
        getUserInfo(name) {
            let cookies = document.cookie.split(";");
            cookies.forEach( (item)=> {
                if (item.indexOf(name) != -1) {
                    this.userInfo=JSON.parse(item.split("=")[1]);
                    return;
                }
            })
        },
        handleCommand(command){
            if(command=="logout"){
                util.deleteCookie('userInfo');
                this.$router.go(0)
            }
        }
    }
}
</script>

<style lang="less">
@mainColor: #20a0ff;
.appbar {
    position: sticky;
    position: -webkit-sticky;
    top:0;
}

.fix-margin {
    padding: 1px !important;
}

.animated {
    transition: .5s !important;
}

.header {
    width: 100%;
    background: @mainColor;
    .container {
        width: 90%;
        margin: 0 auto;
    }
    .logo-title {
        color: #fff;
    }
    .menu-btns {
        display: flex;
        justify-content: flex-end;
        button {
            margin: 0 !important;
        }
        .el-dropdown {
            span {
                color: #fff;
                padding: 10px 15px;
                display: block;
            }
        }
    }
}

.tabs-wrap {
    width: 100%;
    .el-tabs__nav {
        width: 100%;
        float: none !important;
        display: flex;
        justify-content: center;
        .el-tabs__active-bar {
            display: none;
        }
    }
}

.tab-show {}
</style>