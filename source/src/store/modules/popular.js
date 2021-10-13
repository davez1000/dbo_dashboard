import Api from '@/services/api'

export default {
  state: {
    popular: [],
    popularLoading: false,
    roles: [],
  },
  mutations: {
    SET_POPULAR_DATA(state, data) {
      state.popular = data;
    },
    POPULAR_LOADING(state, data) {
      state.popularLoading = data;
    },
    SET_ROLES(state, data) {
      state.roles = data;
    }
  },
  actions: {
    async loadPopular({commit}, val) {
      commit('POPULAR_LOADING', true);
      try {
        let popular = await Api().get(`/dbo_stats/popular/${val.date}/${val.role}/0/desc?_format=json`);
        commit('SET_POPULAR_DATA', popular.data);
      } catch (err) {
        // console.log(err);
      }
      commit('POPULAR_LOADING', false);
    },
    async loadRoles({commit}) {
      try {
        let roles = await Api().get(`/dbo_stats/roles/0/0/0/0?_format=json`);
        commit('SET_ROLES', roles.data);
      } catch (err) {
        // console.log(err);
      }
    }
  },
  getters: {
    popularData: state => state.popular,
    popularLoading: state => state.popularLoading,
    roles: state => state.roles,
  }
}
