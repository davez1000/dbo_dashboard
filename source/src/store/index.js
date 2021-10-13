import Vue from 'vue'
import Vuex from 'vuex'
// import Api from '@/services/api'
import Popular from '@/store/modules/popular'
import HitsByRole from '@/store/modules/hitsbyrole'
import FailedSearches from '@/store/modules/failedsearches'
import Online from '@/store/modules/online'
import Active from '@/store/modules/active'
import SearchTerms from '@/store/modules/searchterms'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Popular,
    HitsByRole,
    FailedSearches,
    Online,
    Active,
    SearchTerms,
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters: {

  }
})
