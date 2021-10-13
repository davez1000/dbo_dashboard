import Vue from 'vue'
import Popular from './Popular.vue'
import HitsByRole from './HitsByRole.vue'
import FailedSearches from './FailedSearches.vue'
import SearchTerms from './SearchTerms.vue'
import Online from './Online.vue'
import Active from './Active.vue'
import Version from './Version.vue'
import store from './store'

import VCalendar from 'v-calendar';
Vue.use(VCalendar);

Vue.config.productionTip = false
const app_popular = document.querySelector('#app-vue-midashboard-kbstats-popular');
const app_hitsbyrole = document.querySelector('#app-vue-midashboard-kbstats-hitsbyrole');
const app_failedsearches = document.querySelector('#app-vue-midashboard-kbstats-failedsearches');
const app_searchterms = document.querySelector('#app-vue-midashboard-kbstats-searchterms');
const app_online = document.querySelector('#app-vue-midashboard-kbstats-online');
const app_active = document.querySelector('#app-vue-midashboard-kbstats-active');
const app_version = document.querySelector('#app-vue-midashboard-kbstats-version');

(() => {
  if (app_popular) {
    new Vue({
      store,
      render: h => h(Popular)
    }).$mount('#app-vue-midashboard-kbstats-popular')
  }
  if (app_hitsbyrole) {
    new Vue({
      store,
      render: h => h(HitsByRole)
    }).$mount('#app-vue-midashboard-kbstats-hitsbyrole')
  }
  if (app_failedsearches) {
    new Vue({
      store,
      render: h => h(FailedSearches)
    }).$mount('#app-vue-midashboard-kbstats-failedsearches')
  }
  if (app_searchterms) {
    new Vue({
      store,
      render: h => h(SearchTerms)
    }).$mount('#app-vue-midashboard-kbstats-searchterms')
  }
  if (app_online) {
    new Vue({
      store,
      render: h => h(Online)
    }).$mount('#app-vue-midashboard-kbstats-online')
  }
  if (app_active) {
    new Vue({
      store,
      render: h => h(Active)
    }).$mount('#app-vue-midashboard-kbstats-active')
  }
  if (app_version) {
    new Vue({
      store,
      render: h => h(Version)
    }).$mount('#app-vue-midashboard-kbstats-version')
  }
})();
