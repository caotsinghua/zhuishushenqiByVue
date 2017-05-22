<template>
    <div class="ranklist" v-loading.fullscreen.lock="loading">
        <my-header>
            <h1 class="title">{{listType.title}}</h1>
        </my-header>
        <my-booklist :books="books" @goto="goto($event)"></my-booklist>
    </div>
</template>

<script>
    import apis from '../../store/apis'
    import header from '../common/header'
    import booklist from '../common/bookList'
    export default {
        data() {
            return {
                listType: {
                    id: '',
                    title: ''
                },
                books: [],
                loading:true
            }
        },
        created() {
            this.getBooks();
        },
        components: {
            'my-header': header,
            'my-booklist':booklist
        },
        methods: {
            getBooks() {
                //获取榜单id
                this.listType.id = this.$route.params.id;
                this.$http.get(apis.bird + apis.getRankBooks + this.listType.id).then(res => {
                    this.listType.title = res.data.ranking.title;
                    this.books = res.data.ranking.books;
                    this.books.forEach(item => {
                        item.cover = item.cover.replace("/agent/", apis.img_url + "/agent/");
                    })
                    this.loading = false;
                }).catch(err => {
                    console.log(err);
                })
            },
            goto(e) {
                this.$router.push('/bookdetail/'+e.id);
            }
        }
    }
</script>

<style lang="less" scoped>
</style>