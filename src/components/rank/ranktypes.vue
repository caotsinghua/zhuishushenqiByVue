<template>
    
        <div class="ranktypes">
            <my-header>
                <h1 class="title">排行榜</h1>
            </my-header>
            <div class="female">
                <h3 class="title">男生</h3>
                <ul class="list">
                    <li class="list-item" v-for="(item,index) in female" :key="index" @click.stop="goto(item._id)">
                        <img :src="item.cover" class="list-icon"/>
                        <p>{{item.title}}</p>
                    </li>
                </ul>
            </div>
            <div class="male">
                <h3 class="title">女生</h3>
                <ul class="list">
                    <li class="list-item" v-for="(item,index) in male" :key="index" @click.stop="goto(item._id)"> 
                         <img :src="item.cover" class="list-icon"/>
                         <p>{{item.title}}</p>
                    </li>
                </ul>
            </div>
        </div>
    
</template>

<script>
    import api from '../../store/apis'
    import header from '../common/header'
    export default {
        data() {
            return {
                female:[],
                male:[]
            }
        },
        created(){
            this.getTypes();
        },
        components:{
            'my-header':header
        },
        methods: {
            getTypes() {
                this.$http.get(api.bird + api.getRankCategories).then(res => {
                    this.female=res.data.female;
                    this.male=res.data.male;
                    console.log(this.female)
                    this.female.forEach(item=>{
                        item.cover=item.cover.replace("/ranking-cover/",api.img_url+"/ranking-cover/")
                    })
                    this.male.forEach(item=>{
                        item.cover=item.cover.replace("/ranking-cover/",api.img_url+"/ranking-cover/")
                    })
                })
            },
            goto(id){
                this.$router.push('/ranktypes/'+id);
            }
        }
    }
</script>

<style lang="less" scoped>
    .ranktypes{
        margin-top:3rem;
        .title{
            margin-left:1rem;
        }
        .list{
            margin:0;
            padding:0;
            .list-item{
                display:flex;
                align-items:center;
                padding:0.5rem 1rem;
                .list-icon{
                    width:2rem;
                    height:2rem;
                    margin-right:1rem;
                }
            }
        }
    }
</style>