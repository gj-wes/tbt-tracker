<template>
  <base-header></base-header>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import BaseHeader from './components/base/BaseHeader.vue'

export default {
  components: {
    BaseHeader
  }  
}
</script>

<style scoped>
main {
  padding: 0 1rem 1rem 1rem;
}
</style>