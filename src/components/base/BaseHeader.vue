<template>
  <header>
    <h1>
      <router-link to="/">
        TBT Tracker
      </router-link>
    </h1>
  </header>
</template>

<style scoped>
  header {
    padding: 1rem;
    background-color: seagreen;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px
  }
  h1 {
    margin: 0;
    color: white;
    white-space: nowrap;
  }
  a {
    text-decoration: none;
    color: currentColor
  }
</style>