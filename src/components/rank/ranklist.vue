<template>
    <div class="ranklist">
        <my-header>
            <h1 class="title">{{listType.title}}</h1>
        </my-header>
        <div class="book-list">
            <ul class="list">
                <li class="book" v-for="(book,index) in books" :key="index" @click="goto(book._id)">
                    <img :src="book.cover" class="cover" />
                    <div class="book-info">
                        <p class="book-title">{{book.title}}</p>
                        <p class="author">{{book.author}} | {{book.cat}}</p>
                        <p class="short-intro">{{book.shortIntro}}</p>
                        <span>{{book.latelyFollower}} 人在追 | {{book.retentionRatio}}% 读者留存</span>
                    </div>
    
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import apis from '../../store/apis'
    import header from '../common/header'
    export default {
        data() {
            return {
                listType: {
                    id: '',
                    title: ''
                },
                books: []
            }
        },
        created() {
            this.getBooks();
        },
        components: {
            'my-header': header
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
                        item.hasNew = true;
                    })
                }).catch(err => {
                    console.log(err);
                })
            },
            goto(id) {
                this.$router.push('/bookdetail/' + id);
            }
        }
    }
</script>

<style lang="less" scoped>
    .book-list {
        padding-top:2.5rem;
        .list {
            .book {
                padding: 0.5rem 1rem;
                display: flex;
                border-bottom: 1px solid #eee;
                align-items: center;
                .cover {
                    width: 3rem;
                    height: 4rem;
                }
                .book-info {
                    display: flex;
                    flex-direction: column;
                    padding-left: 1rem;
                    justify-content: space-between;
                    height: 5rem;
                    .author {
                        font-size: 0.8rem;
                        color: grey;
                    }
                    .book-title {
                        font-size: 0.9rem;
                    }
                    .short-intro {
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        max-width: 15rem;
                        font-size: 0.8rem;
                        color: grey;
                    }
                    span {
                        color: #ccc;
                        font-size: 0.6rem;
                    }
                }
            }
        }
    }
</style>