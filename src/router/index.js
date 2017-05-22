<<<<<<< HEAD
import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main'
import Login from '@/views/login'
import Books from '@/views/books'
import Communities from '@/views/communities'
import Find from '@/views/find'
import Book from '@/views/book'
import RankTypes from '@/views/ranktypes'
import RankList from '@/views/ranklist'
import BookDetail from '@/views/bookdetail'
import Topics from '@/views/topics'
import Categories from '@/views/categories'
import CategoryBooks from '@/views/categoryBooks'
import NotFound from '@/views/notfound'
Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [{
    path: '/', //整个界面
    name: 'index',
    component: Main,
    redirect: {
      name: 'Books'
    },
    children: [{ //主界面内部，tab以下
      path: 'books',
      name: 'Books',
      component: Books,
    }, {
      path: 'Communities',
      name: 'Communities',
      component: Communities
    }, {
      path: 'find',
      name: 'Find',
      component: Find
    }]
  }, { //整个界面
    path: '/book/:id',
    component: Book
  }, {
    path: '/ranktypes', //排名类别
    component: RankTypes
  }, {
    path: '/topics', //主题书单
    component: Topics
  }, {
    path: '/ranklist', //排名表
    component: RankList
  }, {
    path: '/bookdetail/:id',
    name: 'BookDetail',
    component: BookDetail
  }, {
    path: '/categories',
    name: 'Categories',
    component: Categories
  }, {
    path: '/categorybooks',
    name: 'Categorybooks',
    component: CategoryBooks
  }, {
    path: '/topics',
    name: 'Topics',
    component: Topics
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path:'*',
    name:'404',
    component:NotFound
  }]
})
let getCookie = function (name) {
  let cookie = document.cookie.split(";");
  //console.log(document.cookie);
  let ans = '';
  cookie.forEach(function (item) {
    if (item.indexOf(name) != -1) {
      ans = item.split("=")[1];
      return;
    }
  })
  return ans;
}
router.beforeEach((to, from, next) => {
  //to and from are Route Object,next() must be called to resolve the hook
  getCookie('userInfo')
  if (to.name == "Login") {
    next();
  } else {//除登录的页面
    if (!getCookie('userInfo')) {
      next('/login');
    } else {
      next();
    }
  }
  next();
})
export default router;
=======
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
import Topics from '@/components/topics/topics'
import Categories from '@/components/categories/categories'
import CategoryBooks from '@/components/categories/categoryBooks'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/', //整个界面
        component: Main,
        children: [{ //主界面内部，tab以下
            path: '',
            name: 'books',
            component: Books,
        }, { //主界面内部，tab以下
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
        path: '/topics', //主题书单
        component: Topics
    }, {
        path: '/ranktypes/:id', //排名表
        component: RankList
    }, {
        path: '/bookdetail/:id',
        name: 'BookDetail',
        component: BookDetail
    }, {
        path: '/categories',
        name: 'Categories',
        component: Categories
    }, {
        path: '/categorybooks',
        name: 'Categorybooks',
        component: CategoryBooks
    }, {
        path: '/topics',
        name: 'Topics',
        component: Topics
    }]
})
>>>>>>> 2e62cf3712471af45e55247baf5ad9afea432150
