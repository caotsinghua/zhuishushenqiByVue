<template>
    <div>
        <h1>{{errorMessage}}</h1>
    </div>
</template>
<script>
export default {
    data() {
        return {
            errorMessage: '请求的页面不存在'
        }
    }
}
</script>
<style lang="less" scoped>

</style>