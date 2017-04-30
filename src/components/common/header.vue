<template>
    <header>
        <div class="header-bar">
            <a href="javascript:;" class="back-btn" @click="back()"><i class="el-icon-arrow-left"></i></a>
            <slot class="title"></slot>
            <el-button type="primary" icon="more" class="more-btn"></el-button>
        </div>
    </header>
</template>
<script>
    export default{
        data(){
            return {}
        },
        methods:{
            back(){
                this.$router.back();
            }
        }

    }
</script>
<style lang="less" scoped>
@mainColor: #20a0ff;
    .header-bar {
        display: flex;
        background:@mainColor;
        justify-content: space-between;
        align-items:center;
        position:fixed;
        top:0;
        width: 100%;
        .title{
            color:#fff;
        }
        .back-btn {
            display: block;
            height: 2.5rem;
            line-height: 2.5rem;
            color: #fff;
            width: 2rem;
            text-align: center;
        }
        .more-btn {
            background: transparent;
            border: none;
        }
    }
</style>