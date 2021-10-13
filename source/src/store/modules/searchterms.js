import Api from '@/services/api'

export default {
  state: {
    searchTerms: [],
    searchTermsLoading: false,
    roles: [],
  },
  mutations: {
    SET_SEARCHTERMS_DATA(state, data) {
      state.searchTerms = data;
    },
    SEARCHTERMS_LOADING(state, data) {
      state.searchTermsLoading = data;
    },
  },
  actions: {
    async loadSearchTerms({
      commit
    }) {
      commit('SEARCHTERMS_LOADING', true);
      try {
        let searchterms = await Api().get(`/dbo_stats/searchterms/0/0/0/desc?_format=json`);
        commit('SET_SEARCHTERMS_DATA', searchterms.data);
      } catch (err) {
        // console.log(err);
      }
      commit('SEARCHTERMS_LOADING', false);
    },
  },
  getters: {
    searchTermsData: state => state.searchTerms,
    searchTermsLoading: state => state.searchTermsLoading,
  }
}
