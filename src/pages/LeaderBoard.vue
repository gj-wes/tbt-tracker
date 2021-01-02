<template>
  <p>LEADERBOARD</p>
  <p v-if="isLoading">Collating scores...</p>
  <div v-else class="scoreboard">
    <div class="header header__team">Team</div>
    <div class="header header__point">Points</div>

    <template v-for="(team, ind) in sortedScores" :key="ind">
      <div class="name">{{ teams[team.id].teamName }}</div>
      <div class="points">{{ team.score }}</div>

      <div class="breakdown" :class="{ 'breakdown--hidden': hideBreakdowns }">
        <table>
          <tr>
            <th></th>
            <th>Pos</th>
            <th>Kills</th>
            <th>Points</th>
          </tr>
          <tr>
            <td>Game 1</td>
            <td>{{ scores[team.id][0].position }}</td>
            <td>{{ scores[team.id][0].kills }}</td>
            <td>{{ scores[team.id][0].points }}</td>
          </tr>
          <tr>
            <td>Game 2</td>
            <td>{{ scores[team.id][1].position }}</td>
            <td>{{ scores[team.id][1].kills }}</td>
            <td>{{ scores[team.id][1].points }}</td>
          </tr>
          <tr>
            <td>Game 3</td>
            <td>{{ scores[team.id][2].position }}</td>
            <td>{{ scores[team.id][2].kills }}</td>
            <td>{{ scores[team.id][2].points }}</td>
          </tr>
        </table>
      </div>

    </template>
  </div>
  <base-button @click="hideBreakdowns = !hideBreakdowns">Show / Hide game breakdowns</base-button>
  <base-button @click="getDataFromFb">Refresh scores</base-button>
</template>

<script>
import fb from '../firebaseInit.js'

export default {
  data() {
    return {
      isLoading: false,
      teams: null,
      scores: null,
      hideBreakdowns: true
    }
  },
  computed: {
    sortedScores() {
      const scores = [];

      for (const id in this.scores) {
        const scoreObj = {
          id,
          score: 0
        }

        this.scores[id].forEach(score => scoreObj.score += score.points)

        scores.push(scoreObj)
      }

      return scores.sort((a,b) => b.score - a.score)
    }
  },
  methods: {
    async getDataFromFb() {
      this.isLoading = true;
      try {
        const scoresFromFb = await fb.database().ref('scores').once('value').then(snapshot => snapshot.val())
        this.scores = scoresFromFb;
        const teamsFromFb = await fb.database().ref('teams').once('value').then(snapshot => snapshot.val())
        this.teams = teamsFromFb;
      } catch (error) {
        console.error(error)
      }
      this.isLoading = false;
    }
  },
  created() {
    this.getDataFromFb()
  }
}
</script>

<style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  td {
    border: 1px solid seagreen;
    padding: .5rem 1rem;
    text-align: center;
  }

  .scoreboard {
    display: grid;
    grid-template-columns: 2fr 1fr;
    border: 2px solid seagreen;
  }

  .header {
    font-weight: bold;
    font-size: 2.1rem;
    padding: .5rem 1rem;
  }
  .header__team {
    text-align: left;
  }
  .header__point {
    text-align: center;
  }

  .name {
    font-size: 1.8rem;
    padding: .5rem 1rem;
  }
  .points {
    text-align: center;
    font-size: 1.8rem;
    padding: .5rem 0;
  }
  .header__point,
  .points {
    border-left: 2px solid seagreen;
  }
  .name, .points {
    border-top: 2px solid seagreen;
  }
  .breakdown {
    grid-column: 1 / -1;
    overflow: hidden;
    max-height: 200px;
    transition: max-height .3s ease-in-out, padding .2s ease-in-out;
    padding: 1rem 0;
  }
  .breakdown--hidden {
    max-height: 0;
    padding: 0;
  }
</style>