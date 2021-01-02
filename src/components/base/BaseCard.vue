<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
  .card {
    border-radius: 10px;
    padding: 1rem;
    margin: 2rem auto;
    /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25); */
    border: 2px solid seagreen
  }
</style>