<template>
  <section>
    <Header />
    <ProductsList />
    <Cart />
    <Modal />
    <Alert />
  </section>
</template>

<script>
import { getUser, removeAuthenticationToken, signOut } from '@/services/auth';
import Alert from '@/components/Alert.vue';
import Cart from '@/components/Cart.vue';
import Modal from '@/components/Modal.vue';
import Header from '@/components/Header.vue';
import ProductsList from '@/components/ProductsList.vue';

export default {
  name: 'Home',
  components: {
    Alert,
    Cart,
    Header,
    Modal,
    ProductsList,
  },
  methods: {
    handleLogout() {
      signOut();
      removeAuthenticationToken();
      this.$router.push({ name: 'login' });
    },
  },
  async created() {
    try {
      await getUser();
    } catch (error) {
      this.handleLogout();
    }
  },
};
</script>
