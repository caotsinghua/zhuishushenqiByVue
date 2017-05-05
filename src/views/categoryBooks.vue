<template>
  <div>
    <my-header>
      <h1 class="title">分类</h1>
    </my-header>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="1">
      <my-booklist :books="books" v-loading.fullscreen.lock="loading" @goto="goto($event)"></my-booklist>
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
      books: [],
      loading: true,
      booksStart: 0,
      booksLimit: 50,
      busy: false
    }
  },
  filters: {

  },
  created() {
    this.getBooks(this.booksStart, this.booksLimit);
  },
  components: {
    'my-header': header,
    'my-booklist': booklist
  },
  methods: {
    getBooks(start, limit) {
      let query = this.$route.query;
      this.$http.get(apis.bird + apis.getCategoryBooks + "?gender=" + query.gender + "&major=" + query.major + "&start=" + start + "&limit=" + limit).then(res => {
        let books = res.data.books;
        books.forEach(item => {
          item.cover = item.cover.replace("/agent/", apis.img_url + "/agent/");
          let jsonStr = JSON.stringify(item);
          jsonStr = jsonStr.replace("majorCate", "cat")
          item = JSON.parse(jsonStr);
          this.books.push(item);
        })
        this.loading = false;
        this.busy = false;
      })
    },
    goto(e) {
      this.$router.push('/bookdetail/' + e.id);
    },
    loadMore() {
      this.loading = true;
      this.busy = true;
      this.booksStart += this.booksLimit;
      this.getBooks(this.booksStart, this.booksLimit);
    }
  }
}
</script>

<style lang="less" scoped>

</style>