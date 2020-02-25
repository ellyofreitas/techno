<template>
  <section>
    <header class="header">
      <img class="logo" src="../assets/techno.svg" alt="Techno" />
    </header>
    <form @submit.prevent="handleSubmit">
      <h2 class="title">Cadastro</h2>
      <div class="input-group">
        <label for="name">Nome </label>
        <input v-model="name" id="name" type="text" required />
      </div>
      <div class="input-group">
        <label for="email">E-mail </label>
        <input v-model="email" id="email" type="email" required />
      </div>
      <div class="input-group">
        <label for="password">Senha </label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <div v-if="showCode" class="input-group">
        <label for="code"
          >Código de verificação (
          <a @click="handleResendCode" href="#">Reenviar o código</a> )
        </label>
        <input v-model="code" id="code" type="text" required />
      </div>
      <router-link to="/login">Já tem conta?</router-link>
      <button class="btn">Cadastrar</button>
    </form>
    <Alert />
  </section>
</template>

<script>
import { register, resendSignUp, completeRegister } from '@/services/auth';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      code: null,
      showCode: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.code) {
          await completeRegister(this.email, this.code);
          this.$router.push({ name: 'login' });
        } else {
          const attrs = {
            email: this.email,
            name: this.name,
          };

          await register(this.email, this.password, attrs);
          this.showCode = true;

          this.$store.dispatch('alert', 'Resgate o cód no e-mail cadastrado');
        }
      } catch (error) {
        switch (error.code) {
          case 'UsernameExistsException':
            this.$store.dispatch('alert', 'Este e-mail já está em uso');
            break;
          case 'NotAuthorizedException':
            this.$store.dispatch('alert', 'Este e-mail já foi confirmado');
            break;
          case 'CodeMismatchException':
            this.$store.dispatch('alert', 'Código inválido');
            break;
          default:
            // console.log(error.code);
            this.$store.dispatch('alert', 'Erro ao criar usuário');
        }
      }
    },
    async handleResendCode() {
      try {
        await resendSignUp(this.email);
        this.$store.dispatch(
          'alert',
          'Código reeviando para o e-mail cadastrado'
        );
      } catch (error) {
        if (error.code === 'InvalidParameterException') {
          this.$store.dispatch('alert', 'Este e-mail já foi confirmado');
        }
      }
    },
  },
  created() {
    if (this.$route.params.email) {
      this.name = this.$route.params.email;
      this.email = this.$route.params.email;
      this.password = this.$route.params.password;
      this.showCode = true;
    }
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

label a {
  color: blue;
}

label a:hover {
  color: purple;
  font-weight: normal;
}
</style>
