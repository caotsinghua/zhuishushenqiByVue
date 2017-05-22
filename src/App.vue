
<template>
  <div id="app">
  <transition mode="out-in" enter-active-class="animated bounceInRight " leave-active-class="animated fadeOutRight">
     <router-view ></router-view>
  </transition>
   
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

</style>

