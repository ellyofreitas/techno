<template>
  <header class="header">
    <img
      @click="handleLogout"
      class="logo"
      src="../assets/techno.svg"
      alt="Techno"
    />
    <div @click="handleOpenCart" class="cart_menu">
      {{ cartTotal | toMoney }} | {{ cart.length }}
    </div>
  </header>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { removeAuthenticationToken, signOut } from '@/services/auth';

const {
  mapState: cartState,
  mapGetters: cartGetters,
  mapMutations: cartMutations,
} = createNamespacedHelpers('cart');

export default {
  name: 'Header',
  computed: {
    ...cartState(['cart']),
    ...cartGetters(['cartTotal']),
  },
  methods: {
    ...cartMutations(['SET_CART_ACTIVE']),
    handleOpenCart() {
      this.SET_CART_ACTIVE(true);
    },
    handleLogout() {
      signOut();
      removeAuthenticationToken();
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  max-width: 900px;
  padding: 20px 0;
  margin: 0 auto;
}

.logo {
  width: 80px;
  cursor: pointer;
}

.cart_menu::after {
  content: '';
  display: inline-block;
  background: url('../assets/carrinho.svg') no-repeat center center;
  width: 25px;
  height: 25px;
  margin-left: 10px;
}

.cart_menu {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
