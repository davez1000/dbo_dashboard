import Api from '@/services/api'

export default {
  state: {
    failedSearches: [],
    failedSearchesLoading: false,
  },
  mutations: {
    SET_FAILEDSEARCHES_DATA(state, data) {
      state.failedSearches = data;
    },
    FAILEDSEARCHES_LOADING(state, data) {
      state.failedSearchesLoading = data;
    }
  },
  actions: {
    async loadFailedSearches({commit}, val) {
      commit('FAILEDSEARCHES_LOADING', true);
      try {
        let failedsearches = await Api().get(`/dbo_stats/failedsearches/${val.date}/0/0/desc?_format=json`);
        commit('SET_FAILEDSEARCHES_DATA', failedsearches.data);
      } catch(err) {
        // console.log(err);
      }
      commit('FAILEDSEARCHES_LOADING', false);
    },
  },
  getters: {
    failedSearches: state => state.failedSearches,
    failedSearchesLoading: state => state.failedSearchesLoading,
  }
}
