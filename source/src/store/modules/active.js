import Api from '@/services/api'

export default {
  state: {
    active: [],
    activeLoading: false,
    roles: [],
  },
  mutations: {
    SET_ACTIVE_DATA(state, data) {
      state.active = data;
    },
    ACTIVE_LOADING(state, data) {
      state.activeLoading = data;
    },
  },
  actions: {
    async loadActive({commit}) {
      commit('ACTIVE_LOADING', true);
      try {
        let active = await Api().get(`/dbo_stats/active/0/0/0/0?_format=json`);
        commit('SET_ACTIVE_DATA', active.data);
      } catch (err) {
        // console.log(err);
      }
      commit('ACTIVE_LOADING', false);
    },
  },
  getters: {
    activeData: state => state.active,
    activeLoading: state => state.activeLoading,
  }
}
