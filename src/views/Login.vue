<template>
  <section>
    <header class="header">
      <img class="logo" src="../assets/techno.svg" alt="Techno" />
    </header>
    <form @submit.prevent="handleSubmit">
      <h2 class="title">Login</h2>
      <div class="input-group">
        <label for="email">E-mail </label>
        <input v-model="email" id="email" type="email" required />
      </div>
      <div class="input-group">
        <label for="password">Senha </label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <div v-if="showNewPassword" class="input-group">
        <label for="newPassword">Nova Senha </label>
        <input
          v-model="newPassword"
          id="newPassword"
          type="password"
          required
        />
      </div>
      <router-link to="/register">Ainda não tem conta?</router-link>
      <button class="btn" type="submit">Entrar</button>
    </form>
    <Alert />
  </section>
</template>

<script>
import { authenticate, completeNewPassword } from '@/services/auth';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      newPassword: null,
      showNewPassword: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.newPassword) {
          if (this.newPassword !== this.password) {
            await completeNewPassword(
              this.email,
              this.password,
              this.newPassword
            );
          }
          this.$store.dispatch(
            'alert',
            'Para sua seguraça não use a senha temporária'
          );
        } else {
          const { newPasswordRequired } = await authenticate(
            this.email,
            this.password
          );
          if (newPasswordRequired) {
            this.showNewPassword = true;
            this.$store.dispatch(
              'alert',
              'Para completar seu registro digite uma nova senha'
            );
          } else {
            this.$router.push({ name: 'home' });
          }
        }
      } catch (error) {
        if (error.code === 'UserNotConfirmedException') {
          this.$router.push({
            name: 'register',
            params: { email: this.email, password: this.password },
          });
          this.$store.dispatch('alert', 'Finalize seu cadastro');
        } else {
          // console.log(error);
          this.$store.dispatch('alert', 'Usuário não tem permissão');
        }
      }
    },
  },
};
</script>

<style scoped>
a {
  width: fit-content;
  color: #000;
  text-decoration: none;
}

a:hover {
  font-weight: bold;
  color: #1a1a1a;
}

.header {
  display: flex;
  justify-content: space-between;
  max-width: 900px;
  padding: 20px 0;
  margin: 0 auto;
}

.logo {
  width: 80px;
}

form {
  position: relative;
  margin: 10px auto;
  padding: 40px;
  max-width: 700px;
  /* border-radius: 4px; */
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  box-shadow: 2rem 2rem 2rem 2rem rgba(0, 0, 0, 0.1);
}

.input-group {
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.title {
  margin-bottom: 10px;
  padding-bottom: 20px;
}

input {
  outline: 0;
  padding: 10px;
  border: 2px solid #000;
  /* box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2); */
}

button {
  margin-top: 15px;
  background: #000;
  cursor: pointer;
  color: #fff;
  border: none;
  font-size: 1rem;
  padding: 10px 25px;
  font-family: 'Noto Serif', sans-serif;
}
</style>
