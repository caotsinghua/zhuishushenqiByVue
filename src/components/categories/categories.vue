<template>
  <div>
    <my-header>
      <h1 class="title">分类</h1>
    </my-header>
    <div class="categories">
      <div class="male">
        <h1 class="list-title">男生</h1>
        <ul class="list">
          <li class="item" v-for="(item,index) in male" :key="index" @click.stop="gotoMale(index)">
            <p class="name">{{item.name}}</p>
            <p class="book-count">{{item.bookCount|bookCount}}</p>
          </li>
        </ul>
      </div>
      <div class="female">
        <h1 class="list-title">女生</h1>
        <ul class="list">
          <li class="item" v-for="(item,index) in female" :key="index" @click.stop="gotoFemale(index)">
            <p class="name">{{item.name}}</p>
            <p class="book-count">{{item.bookCount|bookCount}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import apis from '../../store/apis'
  import header from '../common/header'
  export default {
    data() {
      return {
        male: [],
        female: []
      }
    },
    filters: {
      bookCount(num) {
        return num + '本';
      }
    },
    created() {
      this.getCategories();
    },
    components: {
      'my-header': header
    },
    methods: {
      getCategories() {
        this.$http.get(apis.bird + apis.getCategories).then(res => {
          this.male = res.data.male;
          this.female = res.data.female;
        })
      },
      gotoMale(index) {
        this.$router.push({
          path: '/categorybooks',
          query: {
            gender:'male',
            major: this.male[index].name
          }
        })
      },
      gotoFemale(index) {
        this.$router.push({
          path: '/categorybooks',
          query: {
            gender:'female',
            major: this.female[index].name
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .categories {
    padding-top: 3rem;
    .list-title {
      border-bottom: 1px solid #eee;
      line-height: 2rem;
      color: grey;
      padding-left: 1rem;
    }
    .list {
      width: 100%;
      display: grid;
      grid-template-columns: 33.33% 33.33% 33.33%;
      overflow: hidden;
      .item {
        text-align: center;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        padding: 0.5rem 0;
        line-height: 1.1rem;
        transition: 0.3s;
        .book-count {
          font-size: 0.8rem;
          color: grey;
        }
        &:nth-child(3n) {
          border-right: none;
        }
        &:active {
          background: #eee;
        }
      }
    }
  }
</style>