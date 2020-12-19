<template>
  <router-link v-if="link" :to="to">
    <slot></slot>
  </router-link>
  <button v-else>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>
  a,
  button {
    display: block;
    width: 100%;
    margin: 1.5rem 0;
    padding: 1rem;
    border-radius: 10px;
    border: 2px solid lightgray;
    font-family: inherit;
    font-size: 2rem;
    color: currentColor;
    text-align: center;
    background-color: #f0f0f0;
    text-decoration: none;
  }
</style>