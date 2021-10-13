import Api from '@/services/api'

export default {
  state: {
    hitsByRole: [],
    hitsByRoleLoading: false,
  },
  mutations: {
    SET_HITSBYROLE_DATA(state, data) {
      state.hitsByRole = data;
    },
    HITSBYROLE_LOADING(state, data) {
      state.hitsByRoleLoading = data;
    },
  },
  actions: {
    async loadHitsByRole({commit}, val) {
      commit('HITSBYROLE_LOADING', true);
      try {
        let hitsbyrole = await Api().get(`/dbo_stats/hitsbyrole/${val.date}/0/0/desc?_format=json`);
        commit('SET_HITSBYROLE_DATA', hitsbyrole.data);
      } catch(err) {
        // console.log(err);
      }
      commit('HITSBYROLE_LOADING', false);
    },
  },
  getters: {
    hitsByRoleData: state => state.hitsByRole,
    hitsByRoleLoading: state => state.hitsByRoleLoading,
  }
}
