import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/products';
import cart from './modules/cart';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alertMessage: '',
    alertActive: false,
  },
  mutations: {
    SET_ALERT_ACTIVE(state, value) {
      state.alertActive = value;
    },
    SET_ALERT_MESSAGE(state, value) {
      state.alertMessage = value;
    },
  },
  actions: {
    alert({ commit }, payload) {
      commit('SET_ALERT_ACTIVE', true);
      commit('SET_ALERT_MESSAGE', payload);
      setTimeout(() => {
        commit('SET_ALERT_ACTIVE', false);
      }, 3000);
    },
    checkout({ dispatch, commit }) {
      commit('cart/SET_CART', []);
      commit('cart/SET_CART_ACTIVE', false);
      dispatch('alert', 'Compra Finalizada');
    },
  },
  modules: {
    products,
    cart,
  },
});
