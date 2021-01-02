<template>
  <h2>Scores</h2>
  <p>Input new or edit an existing score</p>
  <base-card class="score-card" v-for="(score, ind) in inputScores" :key="ind">
    <p class="label">Final position:</p>
    <input v-if="isBeingEdited" type="number" v-model.number="score.position">
    <p v-else class="value">{{ score.position }}</p>

    <p class="label">Total kills:</p>
    <input v-if="isBeingEdited" type="number" v-model.number="score.kills">
    <p v-else class="value">{{ score.kills }}</p>

    <p class="label">Total points:</p>
    <p class="value">{{ score.points }}</p> 
  </base-card>
  <base-button @click="toggleEdit">{{ buttonText }}</base-button>
</template>

<script>
export default {
  data() {
    return {
      inputScores: null,
      isBeingEdited: false
    }
  },
  computed: {
    buttonText() {
      return this.isBeingEdited ? 'Save' : 'Add / Edit scores'
    }
  },
  methods: {
    toggleEdit() {
      this.isBeingEdited = !this.isBeingEdited

      if (!this.isBeingEdited) this.updateTotalsAndDispatch()
    },
    updateTotalsAndDispatch() {
      // there might be a better way to do this, who knows?
      this.inputScores.forEach( (score, ind) => {
        let posScore;

        if (score.position == 1) {
          posScore = 35
        } else if (score.position == 2) {
          posScore = 25
        } else if (score.position == 3) {
          posScore = 20
        } else if (score.position == 4) {
          posScore = 15
        } else if (score.position == 5) {
          posScore = 10
        } else if (score.position > 5 && score.position <= 10) {
          posScore = 5
        } else if (score.position > 10 && score.position <= 15) {
          posScore = 3
        } else if (score.position > 15 && score.position <= 25) {
          posScore = 2
        } else {
          posScore = 0
        }

        this.inputScores[ind].points = +score.kills + posScore
      })

      // dispatch to vuex
      this.$store.dispatch('setScores', this.inputScores)
    }
  },
  mounted() {
    if (this.inputScores === null) {
      this.inputScores = this.$store.getters.teamScores
    }
  }
}
</script>

<style scoped>
  .score-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  p {
    margin: 0;
    font-size: 2rem;
    padding: .4rem 0;
  }
  p.label {
    text-align: right;
  }
  input {
    line-height: 1;
    margin-bottom: 0;
  }
</style>