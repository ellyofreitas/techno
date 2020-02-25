import api from '@/services/api';

const INTIAL_STATE = {
  products: [],
  product: null,
};

const getters = {};

const mutations = {
  SET_PRODUCTS(state, value) {
    state.products = value;
  },
  SET_PRODUCT(state, value) {
    state.product = value;
  },
  DECREMENT_PRODUCT_QUANTITY(state) {
    state.product.stock -= 1;
  },
  INCREMENT_PRODUCT_QUANTITY(state) {
    state.product.stock += 1;
  },
};

const actions = {
  async fetchProducts({ commit }) {
    const { data } = await api.get('/products');
    commit('SET_PRODUCTS', data);
  },
  async fetchProduct({ commit, dispatch }, id) {
    try {
      const { data } = await api.get(`/products/${id}`);
      commit('SET_PRODUCT', data);
    } catch (error) {
      dispatch('alert', 'Produto não disponivel', { root: true });
      // console.log('Produto não disponivel');
    }
  },
};

export default {
  namespaced: true,
  state: INTIAL_STATE,
  getters,
  mutations,
  actions,
};
