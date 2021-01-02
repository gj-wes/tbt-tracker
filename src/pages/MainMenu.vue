<template>
  <h2>
    Welcome back
  </h2>
  <base-button link to="/scores">Scores</base-button>
  <base-button link to="/team">Team</base-button>
  <base-button link to="/all-teams">View All Teams</base-button>
  <base-button link to="/leaderboard">Leaderboard</base-button>
  <base-button @click="logout">Sign Out</base-button>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.replace('/login')
    }
  }
}
</script>

<style>

</style>