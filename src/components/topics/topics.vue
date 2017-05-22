<template>
<div>
  <my-header>
    <h1 class="title">主题书单</h1>
  </my-header>\
  12
</div>
</template>
<script>
import apis from '../../store/apis'
import header from '../common/header'
  export default{
    data(){
      return {

      }
    },
    created(){
      this.getTopics();
    },
    components:{
      'my-header':header
    },
    methods:{
      getTopics(){
        this.$http.get(apis.bird+apis.getTopicBooks).then(res=>{
          console.log(res.data)
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  
</style>