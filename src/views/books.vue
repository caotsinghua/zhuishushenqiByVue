<template>
    <div class="books-wrap" key="books">
    <h1 v-if="books.length==0" class="ifno">没有正在追的书籍~</h1>
        <ul class="books">
            <li class="book" v-for="(book,index) in books" @click="readBook(index)">
                <div class="book-info">
                    <img :src="book.cover" :alt="book.title">
                    <div class="book-text">
                        <p>{{book.title}}</p>
                        <div>
                            <span>{{book.updateTime|updateTime}}</span>
                            <span>{{book.updateChapter}}</span>
                        </div>
                    </div>
                </div>
                <div v-if="book.hasNew" class="hasnew"></div>
            </li>
        </ul>
    </div>
</template>

<script>
import apis from '../store/apis.js'
import util from '../util.js'
export default {
    data() {
        return {
            books: []
        }
    },
    created() {
        this.getUserBooks();
    },
    filters: {
        updateTime(time) {
            let time1 = (new Date(time)).getTime();
            let nowtime = new Date().getTime();
            let passTime = (nowtime - time1) / 1000;
            let year, month, day, hours, minutes;
            year = Math.floor(passTime / 31536000);
            passTime -= year * 31536000;
            month = Math.floor(passTime / 2592000);
            passTime -= month * 2592000;
            day = Math.floor(passTime / 86400);
            passTime -= day * 86400;
            hours = Math.floor(passTime / 3600);
            passTime -= hours * 3600;
            minutes = Math.floor(passTime / 60);

            if (year != 0) {
                return year + "年前"
            } else if (month != 0) {
                return month + "月前"
            } else if (day != 0) {
                return day + "天前"
            } else if (hours != 0) {
                return hours + "小时前"
            } else {
                return minutes + "分钟前"
            }
        }
    },
    methods: {
        getUserBooks() {
            //获取周榜单
            let id = JSON.parse(util.getCookie('userInfo')).userid;
            this.$http.get(apis.getuser + "?id=" + id).then(res => {
                this.books = res.data.booklist;
                this.books.forEach(item=>{
                    item.hasNew=true;
                })
            }).catch(err => {
                throw err;
            })

        },
        readBook(index) {
            this.$router.push("/book/" + this.books[index].bookId);
            // this.books[index].lastReadTime=(new Date()).getTime();
            // this.books[index].hasNew=false;
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
    margin: 0;
    margin-left: 1rem;
    margin-bottom: 0.5rem;
}
.ifno{
    text-align: center;
    color:grey;
}
</style>