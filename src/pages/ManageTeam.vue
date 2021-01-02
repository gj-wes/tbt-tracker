<template>
  <h2>
    Team
  </h2>
  <base-card class="member-card" v-for="(member, ind) in inputTeam" :key="ind">
    <p class="label">Name:</p>
    <input v-if="isBeingEdited" type="text" v-model.trim="member.name">
    <p v-else class="value">{{ member.name }}</p>

    <p class="label">Gamertag:</p>
    <input v-if="isBeingEdited" type="text" v-model.trim="member.gtag">
    <p v-else class="value">{{ member.gtag }}</p>

    <div class="platform-select" v-if="isBeingEdited">
      <label for="platPS">PS</label>
      <input type="radio" :name="'platform'+ind" value="psn" id="platPS" :checked="member.platform === 'psn'" v-model="member.platform">
      <label for="platXB">Xbox</label>
      <input type="radio" :name="'platform'+ind" value="xbl" id="platXB" :checked="member.platform === 'xbl'" v-model="member.platform">
      <label for="platPC">PC</label>
      <input type="radio" :name="'platform'+ind" value="pc" id="platPC" :checked="member.platform === 'pc'" v-model="member.platform">
    </div>
  </base-card>
  <base-button @click="toggleEdit">{{ buttonText }}</base-button>
</template>

<script>
export default {
  data () {
    return {
      inputTeam: null,
      isBeingEdited: false
    }
  },
  computed: {
    buttonText() {
      return this.isBeingEdited ? 'Save' : 'Edit Team'
    }
  },
  methods: {
    toggleEdit() {
      this.isBeingEdited = !this.isBeingEdited

      if (!this.isBeingEdited) this.updateAndDispatch()
    },
    updateAndDispatch() {
      // dispatch to vuex
      this.$store.dispatch('setTeam', this.inputTeam)
    }
  },
  created() {
    if (this.inputTeam === null) {
      this.inputTeam = this.$store.getters.teamMembers
    }
  }
}
</script>

<style scoped>
  .member-card {
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
  .platform-select {
    grid-column: span 2;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>