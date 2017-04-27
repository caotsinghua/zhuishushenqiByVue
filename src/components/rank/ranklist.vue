<template>
    <div class="ranklist">
        <my-header>
            <h1 class="title">{{listType.title}}</h1>
        </my-header>
    </div>
</template>

<script>
    import apis from '../../store/apis'
    import header from '../common/header'
    export default {
        data() {
            return {
                listType:{
                    id:'',
                    title:''
                },
                books:[]
            }
        },
        created(){
            this.getBooks();
        },
        components:{
            'my-header':header
        },
        methods: {
            getBooks() {
                //获取榜单id
                this.listType.id = this.$route.params.id;
                this.$http.get(apis.bird + apis.getRankBooks + this.listType.id).then(res => {
                    console.log(res);
                    this.listType.title=res.data.ranking.title;
                    this.books = res.data.ranking.books;
                    this.books.forEach(item => {
                        item.cover = item.cover.replace("/agent/", apis.img_url + "/agent/");
                        item.hasNew = true;
                    })
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    }
</script>

<style lang="less">
    
</style>