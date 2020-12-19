import { createApp } from 'vue'
import App from './App.vue'

import router from './router.js'
import store from './store.js'

// import global styles
import './assets/globals.css';

// global components
import BaseButton from './components/base/BaseButton.vue'
import BaseCard from './components/base/BaseCard.vue'

const app = createApp(App);

app.use(router)
app.use(store)

app.component('base-button', BaseButton)
app.component('base-card', BaseCard)

app.mount('#app')
