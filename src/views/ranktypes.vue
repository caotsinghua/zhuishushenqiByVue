<template>
    <div class="ranktypes">
    
        <my-header>
    
            <h1 class="title">排行榜</h1>
    
        </my-header>
    
        <div class="male">
    
            <h3 class="title">男生</h3>
    
            <ul class="list">
    
                <li class="list-item" v-for="(item,index) in male" :key="index" @click.stop="gotoMale(index)">
    
                    <img :src="item.cover" class="list-icon" />
    
                    <p>{{item.title}}</p>
    
                </li>
    
            </ul>
    
        </div>
    
        <div class="female">
    
            <h3 class="title">女生</h3>
    
            <ul class="list">
    
                <li class="list-item" v-for="(item,index) in female" :key="index" @click.stop="gotoFemale(index)">
    
                    <img :src="item.cover" class="list-icon" />
    
                    <p>{{item.title}}</p>
    
                </li>
    
            </ul>
    
        </div>
    
    </div>
</template>

<script>
import api from '../store/apis.js'
import header from '../components/header.vue'

export default {

    data() {

        return {

            female: [],

            male: []

        }

    },

    created() {

        this.getTypes();

    },

    components: {

        'my-header': header

    },

    methods: {

        getTypes() {

            this.$http.get(api.bird + api.getRankCategories).then(res => {

                this.female = res.data.female;

                this.male = res.data.male;


                this.female.forEach(item => {

                    item.cover = item.cover.replace("/ranking-cover/", api.img_url + "/ranking-cover/")

                })

                this.male.forEach(item => {

                    item.cover = item.cover.replace("/ranking-cover/", api.img_url + "/ranking-cover/")

                })

            })

        },

        gotoMale(index) {

            let query = {

                week: this.male[index]._id,

                month: this.male[index].monthRank,

                total: this.male[index].totalRank

            }


            this.$router.push({

                path: '/ranklist/',

                query: query

            });

        },

        gotoFemale(index) {

            this.$router.push({

                path: '/ranklist/',

                query: {

                    week: this.female[index]._id,

                    month: this.female[index].monthRank,

                    total: this.female[index].totalRank

                }

            });

        }

    }

}
</script>

<style lang="less" scoped>
.ranktypes {


    .title {

        margin-left: 1rem;
    }

    .list {

        margin: 0;

        padding: 0;

        .list-item {

            display: flex;

            align-items: center;

            padding: 0.5rem 1rem;

            .list-icon {

                width: 2rem;

                height: 2rem;

                margin-right: 1rem;
            }
        }
    }
}
</style>