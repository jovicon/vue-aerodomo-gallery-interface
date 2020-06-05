import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueFileAgent from 'vue-file-agent'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueAxios, axios)
Vue.use(VueFileAgent)
Vue.use(VueFileAgentStyles)

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
