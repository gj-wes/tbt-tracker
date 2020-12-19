import { createRouter, createWebHistory } from 'vue-router'

import MainMenu from './pages/MainMenu.vue'
import LogInRegister from './pages/LogInRegister.vue'
import Scores from './pages/Scores.vue'
import ManageTeam from './pages/ManageTeam.vue'
import AllTeams from './pages/AllTeams.vue'
import LeaderBoard from './pages/LeaderBoard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainMenu },
    { path: '/login', component: LogInRegister },
    { path: '/scores', component: Scores },
    { path: '/team', component: ManageTeam },
    { path: '/all-teams', component: AllTeams },
    { path: '/leaderboard', component: LeaderBoard },
    { path: '/:notFound(.*)', redirect: '/' }
  ]
})

export default router