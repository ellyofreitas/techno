<template>
  <section
    :class="{ cart_modal: true, active: cartActive }"
    @click="handleCloseCart"
  >
    <div class="cart_container">
      <button @click="SET_CART_ACTIVE(false)" class="cart_close">X</button>
      <h2 class="cart_title">Carrinho</h2>
      <div v-if="cart.length > 0">
        <ul class="cart_list">
          <li v-for="(item, index) in cart" :key="index" class="cart_item">
            <p class="cart_item_title">
              {{ item.name }}
            </p>
            <p class="cart_item_price">
              {{ item.price | toMoney }}
            </p>
            <button class="cart_item_remove" @click="removeItem(index)">
              X
            </button>
          </li>
        </ul>
        <p class="cart_total">
          {{ cartTotal | toMoney }}
        </p>
        <button @click="handleCheckout" class="cart_checkout">
          Finalizar Compra
        </button>
      </div>
      <p v-else>O carrinho está vazio.</p>
    </div>
  </section>
</template>

<script>
import { mapActions, createNamespacedHelpers } from 'vuex';

const {
  mapState: cartState,
  mapMutations: cartMutations,
  mapGetters: cartGetters,
  mapActions: cartActions,
} = createNamespacedHelpers('cart');

export default {
  name: 'Cart',
  computed: {
    ...cartGetters(['cartTotal']),
    ...cartState(['cartActive', 'cart']),
  },
  methods: {
    ...mapActions(['checkout']),
    ...cartActions(['removeItem']),
    ...cartMutations(['SET_CART_ACTIVE']),
    handleCloseCart({ target, currentTarget }) {
      if (target === currentTarget) {
        this.SET_CART_ACTIVE(false);
      }
    },
    handleCheckout() {
      this.checkout();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
};
</script>

<style>
.cart_modal::before {
  content: '';
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

.cart_modal {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 20px;
  display: none;
}

.cart_modal.active {
  display: block;
}

.cart_container {
  position: relative;
  margin: 80px auto;
  background: #fff;
  padding: 40px;
  max-width: 800px;
  animation: fadeInDown 0.3s forwards;
}

.cart_close {
  background: #fff;
  border-radius: 50%;
  border: 2px solid #000;
  width: 40px;
  height: 40px;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1rem;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.cart_title {
  margin-bottom: 10px;
  border-bottom: 2px solid #000;
  padding-bottom: 20px;
}

.cart_total {
  text-align: right;
  padding: 10px 50px 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid #000;
}

.cart_checkout {
  display: block;
  margin-left: auto;
  background: #000;
  cursor: pointer;
  color: #fff;
  font-size: 1rem;
  padding: 10px 25px;
  border: none;
  font-family: 'Noto Serif', sans-serif;
}

.cart_item {
  display: grid;
  grid-template-columns: 1fr 1fr 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 0;
}

.cart_item_remove {
  border: none;
  background: none;
  font-size: 1rem;
  cursor: pointer;
}

.cart_item_price {
  text-align: right;
}

@media screen and (max-width: 900px) {
  .cart_modal {
    padding: 10px;
  }
}
</style>
