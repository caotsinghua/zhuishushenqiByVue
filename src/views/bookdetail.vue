<template>
  <div class="book-detail">
    <my-header>
      <h1 class="title">书籍详情</h1>
    </my-header>
    <div class="book-info">
      <div class="book-header">
        <img :src="book.cover" alt="" class="cover">
        <div class="header-right">
          <p class="book-title">{{book.title}}</p>
          <p class="sub-title">
            <span class="author">{{book.author}}</span> | <span>{{book.cat}}</span> | <span>{{book.wordCount|wordCount}}</span>
          </p>
          <p class="last-time">{{book.updated|updateTime}}</p>
        </div>
      </div>
      <div class="book-btns">
        <el-button type="primary" @click="addBook()" :disabled="isAdd"><i class="el-icon-plus el-icon--left"></i>追更新</el-button>
        <el-button type="primary" @click="startRead()"><i class="el-icon-search el-icon--left"></i>开始阅读</el-button>
      </div>
      <div class="book-number">
        <div class="item">
          <p>追书人数</p>
          <span>{{book.latelyFollower}}</span>
        </div>
        <div class="item">
          <p>读者留存率</p>
          <span>{{book.retentionRatio}}%</span>
        </div>
        <div class="item">
          <p>日更新字数</p>
          <span>{{book.serializeWordCount}}</span>
        </div>
      </div>
      <div class="cat">
        <el-tag class="tag" v-for="(tag,index) in book.tags" :key="index" :type="tagTypes[index%tagTypes.length]">
          {{tag}}
        </el-tag>
      </div>
      <div class="long-intro">
        <p v-html="book.longIntro" :class="{'word-more':wordMore}" @click="wordMore=!wordMore"></p>
      </div>
    </div>
    <div class=""></div>
  </div>
</template>

<script>
import apis from '../store/apis.js'
import header from '../components/header.vue'
import util from '../util'
export default {
  data() {
    return {
      bookId: '',
      book: {},
      tagTypes: ['gray', 'primary', 'success', 'warning', 'danger'],
      wordMore: true,
      isAdd:false
    }
  },
  created() {
    this.getBookInfo();
    this.getComments();
    this.hasAdd();
  },
  components: {
    'my-header': header
  },
  filters: {
    wordCount(num) {
      if (Math.floor(num / 10000) >= 1) {
        return Math.round((num / 10000)) + "万字"
      } else {
        return num + "字";
      }
    },
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
    getBookInfo() {
      let bookId = this.$route.params.id;
      this.bookId = bookId;
      this.$http.get(apis.bird + apis.getBook + bookId).then(res => {
        this.book = res.data;
        this.book.cover = this.book.cover.replace("/agent/", apis.img_url + "/agent/");
        this.book.longIntro = this.book.longIntro.replace("\n", "<br>");
      })
    },
    getComments() {
      this.$http.get(apis.bird + apis.getComments + "?book=" + this.bookId).then(res => {
        console.log(res.data)
      })
    },
    startRead() { //开始阅读
      this.$router.push("/book/" + this.bookId);
    },
    addBook() { //追更新
      let userInfo = JSON.parse(util.getCookie('userInfo'));
      let form = {
        id: this.bookId,
        userid: userInfo.userid
      }
      this.$http.post("http://localhost:3000/api/addbook", form).then((res) => {
        if (res.data.success) {
          this.$message({
            message: res.data.message,
            type: 'success'
          });
          this.isAdd = true;//添加已经追书的标记
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(err => {
        throw err;
      })
      return;
    },
    hasAdd(){
      let id = JSON.parse(util.getCookie('userInfo')).userid;
      this.$http.get("http://localhost:3000/"+apis.getuser + "?id=" + id).then(res => {
       let booklist=res.data.booklist;
       booklist.forEach(item=>{
         if(item.bookId.toString()==this.bookId){
            this.isAdd=true;
            return ;
         }
       })
      }).catch(err => {
        throw err;
      })
    }
  }
}
</script>

<style lang="less" scoped>
.book-detail {
  background: #eee;
  .title {
    color: #fff;
  }
  .book-info {
    padding: 1rem;
    background: #fff;
    .book-header {
      display: flex;
      .cover {
        width: 4rem;
        height: 5rem;
      }
      .header-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 1.2rem;
        padding-left: 1rem;
        .book-title {
          font-size: 0.9rem;
        }
        .sub-title {
          font-size: 0.7rem;
          color: grey;
          .author {
            color: #ff6d00;
          }
        }
        .last-time {
          color: grey;
          font-size: 0.7rem;
        }
      }
    }
    .book-btns {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
      button {
        padding-left: 3rem;
        padding-right: 3rem;
      }
    }
    .book-number {
      display: flex;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
      .item {
        text-align: center;
        flex: 1;
        p {
          font-size: 0.8rem;
          color: grey;
          line-height: 1.2rem;
        }
      }
    }
    .cat {
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
      .tag {
        margin-right: 0.4rem;
      }
    }
    .long-intro {
      padding: 0.5rem 0;
      p {
        font-size: 0.9rem;
        line-height: 1.2rem;
      }
    }
  }
}

.word-more {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical;
  /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 4;
  /** 显示的行数 **/
  overflow: hidden;
  /** 隐藏超出的内容 **/
}
</style>