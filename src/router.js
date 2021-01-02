import { createRouter, createWebHistory } from 'vue-router'

import MainMenu from './pages/MainMenu.vue'
import LogInRegister from './pages/LogInRegister.vue'
import Scores from './pages/Scores.vue'
import ManageTeam from './pages/ManageTeam.vue'
import AllTeams from './pages/AllTeams.vue'
import LeaderBoard from './pages/LeaderBoard.vue'

import store from './store.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainMenu, meta: { reqAuth: true } },
    { path: '/login', component: LogInRegister },
    { path: '/scores', component: Scores, meta: { reqAuth: true } },
    { path: '/team', component: ManageTeam, meta: { reqAuth: true } },
    { path: '/all-teams', component: AllTeams, meta: { reqAuth: true } },
    { path: '/leaderboard', component: LeaderBoard, meta: { reqAuth: true } },
    { path: '/:notFound(.*)', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.reqAuth && !store.getters.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router