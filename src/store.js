import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      teamId: 666,
      teamName: 'Wizard',
      members: [
        {
          name: 'Gary',
          gtag: 'Wizardlowski',
          platform: 'PS'
        },
        {
          name: 'Ben',
          gtag: 'Wizardlowski',
          platform: 'PS'
        },
        {
          name: 'Chazz',
          gtag: 'Wizardlowski',
          platform: 'PS'
        },
        {
          name: 'Twiggy',
          gtag: 'Wizardlowski',
          platform: 'PS'
        }
      ],
      scores: []
    }
  },
  mutations: {
    setTeam(state, payload) {
      state.teamId = payload.teamId,
      state.teamName = payload.teamName,
      state.members = payload.members
    },
    setScores(state, payload) {
      state.scores = payload.scores
    }
  },
  actions: {
    // auth - signup and add team to DB
    // auth - log in and get team / scores from DB
    // add/edit team
    // add/edit score
  },
  getters: {
    teamId(state) {
      return state.teamId
    },
    teamName(state) {
      return state.teamName
    },
    teamMembers(state) {
      return state.teamMembers
    },
    teamScores(state) {
      return state.scores
    }
  }
})

export default store