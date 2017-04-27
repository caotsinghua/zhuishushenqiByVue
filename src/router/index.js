import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/main'
import Books from '@/components/books/books'
import Communities from '@/components/communities/communities'
import Find from '@/components/find/find'
import Book from '@/components/book/book'
import RankTypes from '@/components/rank/ranktypes'
import RankList from '@/components/rank/ranklist'
import BookDetail from '@/components/rank/bookdetail'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/', //整个界面
        component: Main,
        children: [{ //主界面内部，tab以下
            path: 'books',
            name: 'books',
            component: Books,
        }, {
            path: 'Communities',
            name: 'Communities',
            component: Communities
        }, {
            path: 'find',
            name: 'find',
            component: Find
        }]
    }, { //整个界面
        path: '/book/:id',
        component: Book
    }, {
        path: '/ranktypes', //排名类别
        component: RankTypes
    }, {
        path: '/ranktypes/:id', //排名表
        component: RankList
    }, {
        path: '/bookdetail/:id',
        name: 'BookDetail',
        component: BookDetail
    }]
})