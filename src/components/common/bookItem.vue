<template>
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
</template>
<script>
    export default{

    }
</script>
<style lang="less" scoped>
    
</style>