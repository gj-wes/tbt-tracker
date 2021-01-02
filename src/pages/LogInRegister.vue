<template>
  <p>Log in or register your team to continue</p>
  <div class="switch-controls">
    <button 
      class="switch-tab" 
      :class="[ activeTab === 'login' ? 'switch-tab--active' : null ]"
      @click="activeTab = 'login'"
    >Log In</button>
    
    <button 
      class="switch-tab" 
      :class="[ activeTab === 'register' ? 'switch-tab--active' : null ]"
      @click="activeTab = 'register'"
    >Register</button>
  </div>

  <div class="form-wrapper">
    <form @submit.prevent="submitForm">
      <label for="logTeamName">Team Name:</label>
      <input type="text" id="logTeamName" required v-model.trim="teamName">
      <label for="logPass">Password: <span v-if="activeTab === 'register'">(6 character minimum)</span></label>
      <input type="password" id="logPass" required v-model.trim="password">

      <div class="register-members" v-if="activeTab === 'register'">
        <h3>Team Member 1:</h3>
        <label for="TM1name">Name:</label>
        <input type="text" id="TM1name" v-model.trim="teamMembers[0].name" required>
        <label for="TM1gtag">Gamertag:</label>
        <input type="text" id="TM1gtag" v-model.trim="teamMembers[0].gtag" required>
        <label>Platform:</label>
        <div class="platform-select">
          <label for="TM1platPS">PS</label>
          <input type="radio" name="TM1platform" value="psn" id="TM1platPS" v-model="teamMembers[0].platform" required>
          <label for="TM1platXB">Xbox</label>
          <input type="radio" name="TM1platform" value="xbl" id="TM1platXB" v-model="teamMembers[0].platform" required>
          <label for="TM1platPC">PC</label>
          <input type="radio" name="TM1platform" value="pc" id="TM1platPC" v-model="teamMembers[0].platform" required>
        </div>

        <h3>Team Member 2:</h3>
        <label for="TM2name">Name:</label>
        <input type="text" id="TM2name" v-model.trim="teamMembers[1].name">
        <label for="TM2gtag">Gamertag:</label>
        <input type="text" id="TM2gtag" v-model.trim="teamMembers[1].gtag">
        <label>Platform:</label>
        <div class="platform-select">
          <label for="TM2platPS">PS</label>
          <input type="radio" name="TM2platform" value="psn" id="TM2platPS" v-model="teamMembers[1].platform">
          <label for="TM2platXB">Xbox</label>
          <input type="radio" name="TM2platform" value="xbl" id="TM2platXB" v-model="teamMembers[1].platform">
          <label for="TM2platPC">PC</label>
          <input type="radio" name="TM2platform" value="pc" id="TM2platPC" v-model="teamMembers[1].platform">
        </div>

        <h3>Team Member 3:</h3>
        <label for="TM3name">Name:</label>
        <input type="text" id="TM3name" v-model.trim="teamMembers[2].name">
        <label for="TM3gtag">Gamertag:</label>
        <input type="text" id="TM3gtag" v-model.trim="teamMembers[2].gtag">
        <label>Platform:</label>
        <div class="platform-select">
          <label for="TM3platPS">PS</label>
          <input type="radio" name="TM3platform" value="psn" id="TM3platPS" v-model="teamMembers[2].platform">
          <label for="TM3platXB">Xbox</label>
          <input type="radio" name="TM3platform" value="xbl" id="TM3platXB" v-model="teamMembers[2].platform">
          <label for="TM3platPC">PC</label>
          <input type="radio" name="TM3platform" value="pc" id="TM3platPC" v-model="teamMembers[2].platform">
        </div>

        <h3>Team Member 4:</h3>
        <label for="TM4name">Name:</label>
        <input type="text" id="TM4name" v-model.trim="teamMembers[3].name">
        <label for="TM4gtag">Gamertag:</label>
        <input type="text" id="TM4gtag" v-model.trim="teamMembers[3].gtag">
        <label>Platform:</label>
        <div class="platform-select">
          <label for="TM4platPS">PS</label>
          <input type="radio" name="TM4platform" value="psn" id="TM4platPS" v-model="teamMembers[3].platform">
          <label for="TM4platXB">Xbox</label>
          <input type="radio" name="TM4platform" value="xbl" id="TM4platXB" v-model="teamMembers[3].platform">
          <label for="TM4platPC">PC</label>
          <input type="radio" name="TM4platform" value="pc" id="TM4platPC" v-model="teamMembers[3].platform">
        </div>
      </div>

      <base-button>{{ formButtonText }}</base-button>
    </form>
  </div>
</template>

<script>
import fb from '../firebaseInit.js'

export default {
  data() {
    return {
      activeTab: 'login',
      teamName: '',
      password: '',
      teamMembers: [
        {
          name: null,
          platform: null,
          gtag: null
        },
        {
          name: null,
          platform: null,
          gtag: null
        },
        {
          name: null,
          platform: null,
          gtag: null
        },
        {
          name: null,
          platform: null,
          gtag: null
        },
      ]
    }
  },
  computed: {
    teamNameAsEmail() {
      const removeSpaces = this.teamName.replace(/ /g, '_')
      return removeSpaces + "@tbt.co.uk"
    },
    formButtonText() {
      return this.activeTab == 'login' ? 'Login' : 'Submit'
    }
  },
  methods: {
    async submitForm() {
      if (this.activeTab === 'login') {
        
        await this.$store.dispatch('login', {
          email: this.teamNameAsEmail,
          password: this.password
        })
        this.$router.replace('/')

      } else {
        
        const reg = await fb.auth().createUserWithEmailAndPassword(
          this.teamNameAsEmail,
          this.password
        )

        fb.database().ref('teams/' + reg.user.uid).set({
          teamName: this.teamName,
          teamMembers: this.teamMembers
        })
        alert('Team registered!')
        this.activeTab = 'login'
      }
    }
  }
}
</script>

<style scoped>
  .switch-controls {
    display: flex;
  }
  .switch-tab {
    flex: 1 1 50%;
    border: 1px solid lightgray;
    background-color: transparent;
    padding: 1rem;
    font-size: 1.8rem;
  }
  .switch-tab:hover {
    border-top: .5rem solid seagreen;
    padding-top: .6rem;
  }
  .switch-tab--active {
    border-bottom: none;
  }
  .form-wrapper {
    border: 1px solid lightgray;
    border-top: none;
    padding: 1rem;
  }
  .platform-select {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 3rem;
  }

  label > span {
    font-size: 1rem
  }
</style>