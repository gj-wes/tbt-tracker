<template>
  <h2>All Teams</h2>
  <p v-if="isLoading">Loading teams...</p>

  <base-card v-else v-for="(team, i) in teams" :key="i">
    <h3>{{ team.teamName }}</h3>

    <div class="members">
      <template v-for="(member, i) in team.teamMembers" :key="i">
        <p>{{ member.name }}</p>
        <p>
          <a :href="trackerLink(member.platform, member.gtag)" target="_blank">
            codtracker
          </a>
        </p>
      </template>
    </div>
  </base-card>

  <base-button @click="getTeamsFromFb">Refresh teams</base-button>
</template>

<script>
import fb from '../firebaseInit.js'

export default {
  data() {
    return {
      isLoading: false,
      teams: null
    }
  },
  methods: {
    async getTeamsFromFb() {
      this.isLoading = true;
      try {
        const teamsFromFb = await fb.database().ref('teams').once('value').then(snapshot => snapshot.val())
        this.teams = teamsFromFb;
      } catch (error) {
        console.error(error)
      }
      this.isLoading = false;
    },
    trackerLink(plat, tag) {
      return `https://cod.tracker.gg/warzone/profile/${ plat }/${ tag }/matches`
    }
  },
  created() {
    if (this.teams === null) this.getTeamsFromFb()
  }
}
</script>

<style scoped>
.members {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>