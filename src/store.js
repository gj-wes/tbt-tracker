import { createStore } from 'vuex';

import fb from './firebaseInit.js'

const store = createStore({
  state() {
    return {
      teamId: null,
      teamName: null,
      members: [],
      scores: [
        {
          position: 0,
          kills: 0,
          points: 0
        },
        {
          position: 0,
          kills: 0,
          points: 0
        },
        {
          position: 0,
          kills: 0,
          points: 0
        }
      ]
    }
  },
  mutations: {
    setTeam(state, payload) {
      state.teamId = payload.teamId,
      state.teamName = payload.teamName,
      state.members = payload.members
    },
    setScores(state, payload) {
      state.scores = payload
    }
  },
  actions: {
    // auth - log in and get team / scores from DB
    async login(context, payload) {
      const res = await fb.auth().signInWithEmailAndPassword(payload.email, payload.password)

      const teamRes = await fb.database().ref('teams/' + res.user.uid).once('value').then(snapshot => snapshot.val())
      
      context.commit('setTeam', {
        teamId: res.user.uid,
        teamName: teamRes.teamName,
        members: teamRes.teamMembers
      })

      const scoreRes = await fb.database().ref('scores/' + res.user.uid).once('value').then(snapshot => snapshot.val())
      
      if (scoreRes !== null && scoreRes.length) {
        context.commit('setScores', scoreRes)
      }
    },
    async logout(context) {
      await fb.auth().signOut()
      context.commit('setTeam', {
        teamId: null,
        teamName: null,
        members: [],
      })
      context.commit('setScores', [
        {
          position: 0,
          kills: 0,
          points: 0
        },
        {
          position: 0,
          kills: 0,
          points: 0
        },
        {
          position: 0,
          kills: 0,
          points: 0
        }
      ])
    },
    // add/edit team - and send to FB
    async setTeam(context, payload) {
      const teamId = context.getters.teamId;
      await fb.database().ref('teams/' + teamId + '/teamMembers').set(payload)
      context.commit('setTeam', payload)
    },
    // add/edit score - and send to FB
    async setScores(context, payload) {
      const teamId = context.getters.teamId;
      await fb.database().ref('scores/' + teamId).set(payload)
      context.commit('setScores', payload)
    }

  },
  getters: {
    teamId(state) {
      return state.teamId
    },
    teamName(state) {
      return state.teamName
    },
    teamMembers(state) {
      return state.members
    },
    teamScores(state) {
      return state.scores
    },
    isLoggedIn(state) {
      return !!state.teamId
    }
  }
})

export default store