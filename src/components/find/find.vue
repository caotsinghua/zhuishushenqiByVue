<template>
    <div class="find" key="find">
        <ul class="list">
            <li class="list-item" v-for="(item,index) in list" :key="index" @click.stop="goto(item.path)">
                <div class="li-left">
                    <i :class="item.className"></i>
                    <p>{{item.name}}</p>
                </div>
                <i class="el-icon-arrow-right"></i>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [{
                    name: '排行榜',
                    url: '',
                    className: 'el-icon-upload',
                    path: '/ranktypes'
                }, {
                    name: '分类',
                    url: '',
                    className: 'el-icon-edit',
                    path: '/categories'
                }]
            }
        },
        methods: {
            goto(path) {
                this.$router.push(path);
            }
        }
    }
</script>

<style lang="less" scoped>
    @mainColor: #20a0ff;
    .list {
        margin: 0;
        padding: 0;
        .list-item {
            background: #fff;
            display: flex;
            justify-content: space-between;
            border-top: 1px solid #ccc;
            padding: 1rem 1rem;
            color: grey;
            &:last-child {
                border-bottom: 1px solid #ccc;
            }
            .li-left {
                display: flex;
                i {
                    margin-right: 1rem;
                }
            }
        }
    }
</style>