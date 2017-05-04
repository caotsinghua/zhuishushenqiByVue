<template>
  <div>
  
    <header>
  
      <div class="header-bar">
  
        <a href="javascript:;" class="back-btn" @click="back()"><i class="el-icon-arrow-left"></i></a>
  
        <h1 class="title">主题书单</h1>
  
        <div>
  
          <a href="javascript:;" @click="filterList()" class="filter-list">筛选</a>
  
          <el-button type="primary" icon="more" class="more-btn"></el-button>
  
        </div>
  
      </div>
  
    </header>
  
  
  
  </div>
</template>
<script>
  import apis from '../../store/apis'
  
  const week_hot_query = "duration=last-seven-days&sort=collectorCount";
  
  const latest_query = "duration=all&sort=created";
  
  const most_have_query = "duration=all&sort=collectorCount";
  
  export default {
  
    data() {
  
      return {
  
        start: 0,
  
        limit: 20,
  
        gender: 'male',
  
        tags: ['都市', '古代', '架空', '重生', '玄幻', '网游']
  
      }
  
    },
  
    created() {
  
      this.getTopics();
  
    },
  
    components: {},
  
    methods: {
  
      back() {
  
        this.$router.back();
  
      },
  
      getTopics() {
  
        this.$http.get(apis.bird + apis.getTopicBooks + "?" + most_have_query).then(res => {
  
          console.log(res.data)
  
        }).catch(err => {
  
          console.log(err)
  
        })
  
      },
  
      filterList() { //筛选主题
  
  
  
      }
  
    }
  
  }
</script>
<style lang="less" scoped>
  @mainColor: #20a0ff;
  
  .header-bar {
  
    display: flex;
  
    background: @mainColor;
  
    justify-content: space-between;
  
    align-items: center;
  
    position: fixed;
  
    top: 0;
  
    width: 100%;
  
    .title {
  
      color: #fff;
  
    }
  
    .back-btn {
  
      display: block;
  
      height: 2.5rem;
  
      line-height: 2.5rem;
  
      color: #fff;
  
      width: 2rem;
  
      text-align: center;
  
    }
  
    .filter-list {
  
      color: #fff;
  
    }
  
    .more-btn {
  
      background: transparent;
  
      border: none;
  
    }
  
  }
</style>