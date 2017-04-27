<template>
    <li class="book"  @click="readBook(book._id)">
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
</template>

<script>
    export default {
    
    }
</script>

<style lang="less" scoped>
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
</style>