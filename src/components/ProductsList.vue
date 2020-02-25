<template>
  <section class="products">
    <div
      v-for="product in products"
      @click="openModal(product.id)"
      :key="product.id"
      class="product"
    >
      <img
        :src="`${url}/${product.img}`"
        :alt="product.name"
        class="product_img"
      />
      <div class="product_info">
        <span class="product_price"> {{ product.price | toMoney }}</span>
        <h2 class="product_title">{{ product.name }}</h2>
      </div>
    </div>
  </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const {
  mapState: productsState,
  mapActions: productsActions,
} = createNamespacedHelpers('products');

export default {
  data() {
    return {
      url: process.env.VUE_APP_AWS_S3_URL,
    };
  },
  name: 'ProductsList',
  computed: {
    ...productsState(['products']),
  },
  methods: {
    ...productsActions(['fetchProducts', 'fetchProduct']),
    openModal(id) {
      this.fetchProduct(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style>
.products {
  max-width: 900px;
  margin: 100px auto 0 auto;
}
.product {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  background: #fff;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.product_img {
  max-width: 300px;
  margin-right: 40px;
}

.product_title {
  font-size: 3rem;
  line-height: 1;
}

.product_price {
  color: rgba(0, 0, 0, 0.5);
}

@media screen and (max-width: 900px) {
  .products {
    margin-top: 40px;
  }

  .product {
    flex-direction: column;
    align-items: flex-start;
    max-width: 300px;
    margin: 30px auto;
  }

  .product_info {
    padding: 20px;
  }

  .product_img {
    max-width: 100%;
  }

  .product_title {
    font-size: 1.5rem;
  }
}
</style>
