import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { clerkPlugin } from 'vue-clerk/plugin'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import router from './router'

const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App);
app.use(router)
app.use(vuetify)

app.use(clerkPlugin, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
})
app.mount("#app")