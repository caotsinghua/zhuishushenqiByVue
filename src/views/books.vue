<template>
    <div class="books-wrap" key="books">
        <ul class="books">
            <li class="book" v-for="(book,index) in books" @click="readBook(book._id)">
                <div class="book-info">
                    <img :src="book.cover" :alt="book.title">
                    <div class="book-text">
                        <p>{{book.title}}</p>
                        <span>{{book.author}}</span>
                        <span>{{book.cat}}</span>
                    </div>
                </div>
                <div v-if="book.hasNew" class="hasnew"></div>
            </li>
        </ul>
    </div>
</template>

<script>
    import apis from '../store/apis.js'
    export default {
        data() {
            return {
                books: [],
                listType: {
                    _id: '',
                    title: ''
                }
            }
        },
        created() {
            this.getBooks();
        },
        methods: {
            getBooks() {
                //获取周榜单
                this.$http.get(apis.bird + apis.getRankBooks).then(res => {
                    let rankings = res.data.rankings;
                    this.listType._id = rankings[0]._id;
                    this.listType.title = rankings[0].title;
                    this.$http.get(apis.bird + apis.getRankBooks + this.listType._id).then(res => {
                        this.books = res.data.ranking.books;
                        this.books.forEach(item => {
                            item.cover = item.cover.replace("/agent/", apis.img_url + "/agent/");
                            item.hasNew = true;
                            
                        })
                       
                    }).catch(err => {
                        console.log(err);
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            readBook(id) {
                this.$router.push("/book/" + id);
            }
        }
    }
</script>

<style lang="less" scoped>
    @bgColor: #fff;
    @mainColor: #20a0ff;
    .books-wrap {
        width: 100%;
        background: @bgColor;
        li:last-child.book {
            border-bottom: 1px solid #eee;
        }
        .book {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid #eee;
            border-left: none;
            border-right: none;
            border-bottom: none;
            padding: .5rem 1rem;
            transition: .3s;
            &:active {
                background: #eee;
            }
            .book-info {
                display: flex;
                flex-wrap: wrap;
                img {
                    width: 3rem;
                    height: 4rem;
                }
                .book-text {
                    margin-left: 1rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    p,
                    span {
                        margin: 0;
                        line-height: 1.4rem;
                    }
                    span {
                        font-size: .8rem;
                        color: grey;
                    }
                }
            }
            .hasnew {
                width: .5rem;
                height: .5rem;
                border-radius: 50%;
                background: @mainColor;
            }
        }
    }
    
    .container {
        width: 90%;
        margin: 0 auto;
    }
    
    .list-title {
        color: grey;
        margin:0;
        margin-left: 1rem;
        margin-bottom: 0.5rem;
    }
</style>