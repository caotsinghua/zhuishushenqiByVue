<template>
<div class="ranklist" v-loading.fullscreen.lock="loading">

    <my-header>

        <h1 class="title">{{listType.title}}</h1>

    </my-header>

    <div class="tabs-wrap">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">

            <el-tab-pane label="周榜" name="week">
                <my-booklist :books="books1" @goto="goto($event)"></my-booklist>
            </el-tab-pane>

            <el-tab-pane label="月榜" name="month">
                <my-booklist :books="books2" @goto="goto($event)"></my-booklist>
            </el-tab-pane>

            <el-tab-pane label="总榜" name="total">
                <my-booklist :books="books3" @goto="goto($event)"></my-booklist>
            </el-tab-pane>

        </el-tabs>
    </div>
</div>
</template>

<script>
  import apis from '../store/apis.js'
import header from '../components/header.vue'

import booklist from '../components/bookList'

export default {

    data() {

        return {

            listType: {

                id: '',

                title: ''

            },

            books1: [],
            books2: [],
            books3: [],
            loading: true,

            activeName: 'week'

        }

    },

    created() {

        this.getBooks();

    },

    components: {

        'my-header': header,

        'my-booklist': booklist

    },

    methods: {

        getBooks() {

            //获取榜单id

            let query = this.$route.query;

            this.$http.get(apis.bird + apis.getRankBooks + query.week).then(res => {

                this.listType.title = res.data.ranking.title;

                this.books1 = res.data.ranking.books;

                this.books1.forEach(item => {

                    item.cover = item.cover.replace("/agent/", apis.img_url + "/agent/");

                })

                this.loading = false;

            }).catch(err => {
                console.log(err);
            })
            this.$http.get(apis.bird + apis.getRankBooks + query.month).then(res => {

                

                this.books2 = res.data.ranking.books;

                this.books2.forEach(item => {

                    item.cover = item.cover.replace("/agent/", apis.img_url + "/agent/");

                })

                this.loading = false;

            }).catch(err => {
                console.log(err);
            })
            this.$http.get(apis.bird + apis.getRankBooks + query.total).then(res => {

                

                this.books3 = res.data.ranking.books;

                this.books3.forEach(item => {

                    item.cover = item.cover.replace("/agent/", apis.img_url + "/agent/");

                })

                this.loading = false;

            }).catch(err => {
                console.log(err);
            })

        },

        goto(e) {

            this.$router.push('/bookdetail/' + e.id);

        },
        handleClick() {
        }
    }
}
</script>

<style lang="less" scoped>


.book-list {
    padding-top: 0 !important;
}
</style>