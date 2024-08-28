import { createApp } from 'vue'
import App from './App.vue'

// vuetify
import './styles/main.scss'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { router } from './routers'

const vuetify = createVuetify({
  components: components,
  directives: directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

createApp(App).use(router).use(vuetify).mount('#app')
