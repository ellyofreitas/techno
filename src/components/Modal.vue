<template>
  <section v-if="product" @click="closeModal" class="modal">
    <div class="modal_container">
      <div class="modal_img">
        <!-- <img :src="product.img" :alt="product.name" /> -->
        <img :src="`${url}/${product.id}-foto.jpg`" :alt="product.name" />
      </div>
      <div class="modal_data">
        <button @click="SET_PRODUCT(null)" class="modal_close">x</button>
        <span class="modal_price">
          {{ product.price | toMoney }}
        </span>
        <h2 class="modal_title">
          {{ product.name }}
        </h2>
        <p>
          {{ product.description }}
        </p>

        <button
          v-if="product.stock > 0"
          @click="handleAddItem"
          class="modal_button"
        >
          Adicionar Item
        </button>
        <button v-else class="modal_button sold_off" disabled>
          Produto esgotado
        </button>
      </div>
      <Evaluations :evaluations="product.evaluations" />
    </div>
  </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Evaluations from './Evaluations.vue';

const {
  mapState: productsState,
  mapMutations: productsMutations,
} = createNamespacedHelpers('products');

const { mapActions: cartActions } = createNamespacedHelpers('cart');
export default {
  name: 'Modal',
  components: {
    Evaluations,
  },
  data() {
    return {
      url: process.env.VUE_APP_AWS_S3_URL,
    };
  },
  computed: {
    ...productsState(['product']),
  },
  methods: {
    ...productsMutations(['SET_PRODUCT']),
    ...cartActions(['addItem']),
    closeModal({ target, currentTarget }) {
      if (target === currentTarget) {
        this.SET_PRODUCT(null);
      }
    },
    handleAddItem() {
      this.addItem();
    },
  },
};
</script>

<style>
.modal::before {
  content: '';
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 80px;
}

.modal_container {
  background: linear-gradient(to right, transparent 250px, #fff 250px);
  position: relative;
  z-index: 1;
  display: grid;
  align-items: end;
  grid-gap: 50px;
  padding: 50px 50px 50px 0;
  animation: fadeIn 0.3s forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate3D(50px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3D(0, 0, 0);
  }
}

.modal_close {
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

.modal_img {
  grid-column: 1;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.modal_img img {
  max-width: 300px;
  display: block;
}

.modal_data {
  grid-column: 2;
  max-width: 600px;
}

.modal_title {
  font-size: 3rem;
}

.modal_button {
  margin-top: 80px;
  background: #000;
  cursor: pointer;
  color: #fff;
  border: none;
  font-size: 1rem;
  padding: 10px 25px;
  font-family: 'Noto Serif', sans-serif;
}

.modal_button.sold_off {
  background: #808080;
}

.modal_button:active {
  background: #808080;
}

@media screen and (max-width: 900px) {
  .modal {
    padding: 10px;
  }

  .modal_container {
    grid-gap: 20px;
    background: #fff;
    padding: 10px 0px;
  }

  .modal_img {
    grid-row: 2;
  }

  .modal_img img {
    width: 100%;
    max-width: initial;
  }

  .modal_data {
    grid-column: 1;
    padding: 10px;
  }

  .modal_button {
    margin-top: 20px;
  }

  .evaluations {
    grid-column: 1;
    padding: 10px;
  }
}
</style>
