import Api from '@/services/api'

export default {
  state: {
    online: [],
    onlineLoading: false,
    roles: [],
  },
  mutations: {
    SET_ONLINE_DATA(state, data) {
      state.online = data;
    },
    ONLINE_LOADING(state, data) {
      state.onlineLoading = data;
    },
  },
  actions: {
    async loadOnline({commit}) {
      commit('ONLINE_LOADING', true);
      try {
        let online = await Api().get(`/dbo_stats/online/0/0/0/desc?_format=json`);
        commit('SET_ONLINE_DATA', online.data);
      } catch (err) {
        // console.log(err);
      }
      commit('ONLINE_LOADING', false);
    },
  },
  getters: {
    onlineData: state => state.online,
    onlineLoading: state => state.onlineLoading,
  }
}
