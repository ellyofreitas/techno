// import api from '@/services/api';

const INTIAL_STATE = {
  cart: [],
  cartActive: false,
};

const getters = {
  cartTotal(state) {
    return state.cart.reduce((total, item) => item.price + total, 0);
  },
};

const mutations = {
  SET_CART_ACTIVE(state, value) {
    state.cartActive = value;
  },
  SET_CART(state, value) {
    state.cart = value;
  },
};

const actions = {
  addItem({ state, rootState, commit, dispatch }) {
    const { id, name, price } = rootState.products.product;
    commit('SET_CART', [...state.cart, { id, name, price }]);
    commit('products/DECREMENT_PRODUCT_QUANTITY', null, { root: true });
    dispatch('alert', `${name} adicionado ao carrinho`, { root: true });
  },
  removeItem({ state, commit, dispatch }, payload) {
    dispatch('alert', `${state.cart[payload].name} removido do carrinho`, {
      root: true,
    });
    commit(
      'SET_CART',
      state.cart.filter((p, index) => index !== payload)
    );
  },
};

export default {
  namespaced: true,
  state: INTIAL_STATE,
  getters,
  mutations,
  actions,
};
